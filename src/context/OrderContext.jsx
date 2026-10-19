import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getStoredItem, setStoredItem, removeStoredItem, STORAGE_KEYS } from '../services/storageService';
import * as orderService from '../services/orderService';
import { calculateCartTotals } from '../utils/orderUtils';

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  // Cart state persisted in localStorage
  const [cartItems, setCartItems] = useState(() => {
    return getStoredItem(STORAGE_KEYS.CART, []);
  });

  // Active orders state
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Toast notification state
  const [toast, setToast] = useState(null); // { id, message, type: 'info' | 'success' | 'warning' }

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    setStoredItem(STORAGE_KEYS.CART, cartItems);
  }, [cartItems]);

  // Load orders on mount
  const refreshOrders = useCallback(async () => {
    try {
      setLoadingOrders(true);
      const data = await orderService.getOrders();
      setOrders(data);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoadingOrders(false);
    }
  }, []);

  useEffect(() => {
    refreshOrders();
  }, [refreshOrders]);

  // Toast helper
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 4000);
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  // Cart actions
  const addToCart = useCallback((item, qty = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + qty;
        if (newQty <= 0) {
          return prev.filter((i) => i.id !== item.id);
        }
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      } else {
        if (qty <= 0) return prev;
        return [...prev, { ...item, quantity: qty }];
      }
    });
  }, []);

  const updateQuantity = useCallback((itemId, newQuantity) => {
    setCartItems((prev) => {
      if (newQuantity <= 0) {
        return prev.filter((item) => item.id !== itemId);
      }
      return prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    removeStoredItem(STORAGE_KEYS.CART);
  }, []);

  // Get item quantity in cart
  const getItemQuantity = useCallback(
    (itemId) => {
      const item = cartItems.find((i) => i.id === itemId);
      return item ? item.quantity : 0;
    },
    [cartItems]
  );

  // Computed cart totals
  const cartTotals = calculateCartTotals(cartItems);

  // Order actions
  const placeOrder = useCallback(
    async (orderData) => {
      try {
        const newOrder = await orderService.createOrder(orderData);
        await refreshOrders();
        clearCart();
        showToast(`Order #${newOrder.id} placed successfully!`, 'success');
        return newOrder;
      } catch (err) {
        showToast('Failed to place order. Please try again.', 'warning');
        throw err;
      }
    },
    [refreshOrders, clearCart, showToast]
  );

  const handleUpdateOrderStatus = useCallback(
    async (orderId, newStatus) => {
      try {
        const updated = await orderService.updateOrderStatus(orderId, newStatus);
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? updated : o))
        );
        showToast(`Order #${orderId} moved to "${newStatus.toUpperCase()}"`, 'info');
        return updated;
      } catch (err) {
        showToast(`Failed to update order #${orderId}`, 'warning');
        throw err;
      }
    },
    [showToast]
  );

  const simulateIncomingOrder = useCallback(async () => {
    try {
      const newOrder = await orderService.simulateIncomingOrder();
      await refreshOrders();
      showToast(`🔔 New Order received! #${newOrder.id} at Table ${newOrder.tableNumber}`, 'success');
      return newOrder;
    } catch (err) {
      showToast('Simulation failed', 'warning');
    }
  }, [refreshOrders, showToast]);

  const value = {
    cartItems,
    cartTotals,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getItemQuantity,
    orders,
    loadingOrders,
    refreshOrders,
    placeOrder,
    updateOrderStatus: handleUpdateOrderStatus,
    simulateIncomingOrder,
    toast,
    showToast,
    hideToast,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrderContext() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
}

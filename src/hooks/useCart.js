import { useOrderContext } from '../context/OrderContext';

export function useCart() {
  const {
    cartItems,
    cartTotals,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getItemQuantity,
  } = useOrderContext();

  return {
    items: cartItems,
    totals: cartTotals,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getItemQuantity,
    isEmpty: cartItems.length === 0,
  };
}

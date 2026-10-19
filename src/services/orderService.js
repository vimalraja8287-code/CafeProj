import { INITIAL_ORDERS } from '../data/initialOrders';
import { MENU_ITEMS } from '../data/menuData';
import { getStoredItem, setStoredItem, STORAGE_KEYS } from './storageService';
import { generateOrderId, calculateCartTotals } from '../utils/orderUtils';
import { API_CONFIG, apiFetch } from './apiConfig';

/**
 * Initializes and fetches all orders.
 * Reads from localStorage if available, falls back to INITIAL_ORDERS.
 * ASP.NET Core Endpoint target: GET /api/orders
 */
export async function getOrders() {
  if (!API_CONFIG.USE_MOCK_DATA) {
    return await apiFetch('/orders');
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  let orders = getStoredItem(STORAGE_KEYS.ORDERS, null);
  if (!orders || !Array.isArray(orders)) {
    orders = INITIAL_ORDERS;
    setStoredItem(STORAGE_KEYS.ORDERS, orders);
  }
  return orders;
}

/**
 * Retrieves a single order by ID.
 * ASP.NET Core Endpoint target: GET /api/orders/{orderId}
 */
export async function getOrderById(orderId) {
  if (!API_CONFIG.USE_MOCK_DATA) {
    return await apiFetch(`/orders/${orderId}`);
  }

  const orders = await getOrders();
  const order = orders.find((o) => o.id === orderId);
  if (!order) throw new Error(`Order ${orderId} not found`);
  return order;
}

/**
 * Creates a new customer order and saves to localStorage/backend.
 * ASP.NET Core Endpoint target: POST /api/orders
 */
export async function createOrder(orderPayload) {
  if (!API_CONFIG.USE_MOCK_DATA) {
    return await apiFetch('/orders', {
      method: 'POST',
      body: JSON.stringify(orderPayload),
    });
  }

  const orders = await getOrders();
  
  // Calculate totals client-side for prototype (Backend will re-verify in production)
  const { subtotal, tax, total } = calculateCartTotals(orderPayload.items);

  const newOrder = {
    id: generateOrderId(),
    tableNumber: Number(orderPayload.tableNumber) || 3,
    customerName: orderPayload.customerName?.trim() || 'Guest Customer',
    customerPhone: orderPayload.customerPhone?.trim() || 'Not Provided',
    createdAt: new Date().toISOString(),
    status: 'new', // new -> preparing -> ready -> served
    paymentMethod: orderPayload.paymentMethod || 'counter', // 'online' or 'counter'
    paymentStatus: orderPayload.paymentMethod === 'online' ? 'paid' : 'pending',
    specialNotes: orderPayload.specialNotes || '',
    items: orderPayload.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
    subtotal,
    tax,
    total,
  };

  const updatedOrders = [newOrder, ...orders];
  setStoredItem(STORAGE_KEYS.ORDERS, updatedOrders);

  return newOrder;
}

/**
 * Updates the status of an existing order.
 * ASP.NET Core Endpoint target: PATCH /api/orders/{orderId}/status
 */
export async function updateOrderStatus(orderId, newStatus) {
  if (!API_CONFIG.USE_MOCK_DATA) {
    return await apiFetch(`/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status: newStatus }),
    });
  }

  const orders = await getOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  
  if (index === -1) throw new Error(`Order ${orderId} not found`);

  // If status is served or paid at counter, update paymentStatus if needed
  const updatedOrder = {
    ...orders[index],
    status: newStatus,
    updatedAt: new Date().toISOString(),
  };

  if (newStatus === 'served' && updatedOrder.paymentMethod === 'counter') {
    updatedOrder.paymentStatus = 'paid';
  }

  orders[index] = updatedOrder;
  setStoredItem(STORAGE_KEYS.ORDERS, orders);

  return updatedOrder;
}

/**
 * Helper to simulate an incoming order for the staff dashboard demo
 */
export async function simulateIncomingOrder() {
  const sampleTables = [2, 4, 6, 7, 8, 9, 10];
  const randomTable = sampleTables[Math.floor(Math.random() * sampleTables.length)];
  const randomCustomer = [
    { name: 'Rohan Mehta', phone: '+91 98220 11223' },
    { name: 'Sneha Kapoor', phone: '+91 97110 55443' },
    { name: 'Karan Verma', phone: '+91 99001 88776' },
  ][Math.floor(Math.random() * 3)];

  // Select 2-3 random menu items
  const shuffled = [...MENU_ITEMS].sort(() => 0.5 - Math.random());
  const selectedItems = shuffled.slice(0, Math.floor(Math.random() * 2) + 2).map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: Math.floor(Math.random() * 2) + 1,
  }));

  return await createOrder({
    tableNumber: randomTable,
    customerName: randomCustomer.name,
    customerPhone: randomCustomer.phone,
    paymentMethod: Math.random() > 0.5 ? 'online' : 'counter',
    specialNotes: Math.random() > 0.6 ? 'Please serve quickly, thank you!' : '',
    items: selectedItems,
  });
}

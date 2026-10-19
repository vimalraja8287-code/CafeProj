export const INITIAL_ORDERS = [
  {
    id: 'ORD-1001',
    tableNumber: 3,
    customerName: 'Aarav Sharma',
    customerPhone: '+91 98765 43210',
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(), // 12 mins ago
    status: 'new', // new, preparing, ready, served, cancelled
    paymentMethod: 'online', // online, counter
    paymentStatus: 'paid', // paid, pending
    specialNotes: 'Make the coffee extra hot please.',
    items: [
      { id: 'item-6', name: 'Cold Coffee', price: 90, quantity: 2 },
      { id: 'item-1', name: 'Samosa', price: 20, quantity: 2 },
    ],
    subtotal: 220,
    tax: 11,
    total: 231,
  },
  {
    id: 'ORD-1002',
    tableNumber: 1,
    customerName: 'Priya Patel',
    customerPhone: '+91 98123 76543',
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(), // 25 mins ago
    status: 'preparing',
    paymentMethod: 'counter',
    paymentStatus: 'pending',
    specialNotes: 'Less spicy for sandwich.',
    items: [
      { id: 'item-3', name: 'Veg Sandwich', price: 70, quantity: 1 },
      { id: 'item-4', name: 'French Fries', price: 80, quantity: 1 },
      { id: 'item-8', name: 'Fresh Lime Soda', price: 50, quantity: 1 },
    ],
    subtotal: 200,
    tax: 10,
    total: 210,
  },
  {
    id: 'ORD-1003',
    tableNumber: 5,
    customerName: 'Vikram Singh',
    customerPhone: '+91 99887 76655',
    createdAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(), // 40 mins ago
    status: 'ready',
    paymentMethod: 'online',
    paymentStatus: 'paid',
    specialNotes: '',
    items: [
      { id: 'item-5', name: 'Veg Burger', price: 100, quantity: 2 },
      { id: 'item-7', name: 'Chocolate Milkshake', price: 120, quantity: 2 },
    ],
    subtotal: 440,
    tax: 22,
    total: 462,
  },
  {
    id: 'ORD-1004',
    tableNumber: 2,
    customerName: 'Ananya Roy',
    customerPhone: '+91 97654 32109',
    createdAt: new Date(Date.now() - 1000 * 60 * 75).toISOString(), // 75 mins ago
    status: 'served',
    paymentMethod: 'online',
    paymentStatus: 'paid',
    specialNotes: 'Extra chutney with Vada.',
    items: [
      { id: 'item-2', name: 'Masala Vada', price: 25, quantity: 4 },
      { id: 'item-6', name: 'Cold Coffee', price: 90, quantity: 1 },
    ],
    subtotal: 190,
    tax: 9.5,
    total: 199.5,
  }
];

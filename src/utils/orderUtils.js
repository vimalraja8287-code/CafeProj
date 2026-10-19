import { CAFE_INFO } from '../data/menuData';

/**
 * Calculates cart subtotal, taxes (5% GST), and total amount
 */
export function calculateCartTotals(cartItems = [], taxRate = CAFE_INFO.taxRate) {
  const itemQuantity = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = Math.round((subtotal * taxRate) * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;

  return {
    itemQuantity,
    subtotal,
    tax,
    total,
    taxRatePercentage: `${taxRate * 100}%`,
  };
}

/**
 * Generates a unique readable order ID (e.g., ORD-8492)
 */
export function generateOrderId() {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `ORD-${randomNum}`;
}

/**
 * Validates allowed status transitions
 */
export function isValidStatusTransition(currentStatus, nextStatus) {
  const allowedTransitions = {
    new: ['preparing', 'cancelled'],
    preparing: ['ready', 'cancelled'],
    ready: ['served', 'cancelled'],
    served: [],
    cancelled: [],
  };

  return allowedTransitions[currentStatus]?.includes(nextStatus) || false;
}

/**
 * Safe localStorage wrapper for prototype state persistence
 */
export const STORAGE_KEYS = {
  CART: 'brew_bite_cart',
  ORDERS: 'brew_bite_orders',
  TABLE: 'brew_bite_current_table',
};

export function getStoredItem(key, defaultValue) {
  try {
    const item = window.localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading key "${key}" from localStorage:`, error);
    return defaultValue;
  }
}

export function setStoredItem(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving key "${key}" to localStorage:`, error);
  }
}

export function removeStoredItem(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing key "${key}" from localStorage:`, error);
  }
}

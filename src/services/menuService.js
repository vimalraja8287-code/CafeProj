import { MENU_ITEMS, CATEGORIES } from '../data/menuData';
import { API_CONFIG, apiFetch } from './apiConfig';

/**
 * Service to fetch menu items
 * ASP.NET Core Endpoint target: GET /api/menu/items
 */
export async function getMenuItems() {
  if (!API_CONFIG.USE_MOCK_DATA) {
    return await apiFetch('/menu/items');
  }
  
  // Simulate network delay for prototype realism
  await new Promise((resolve) => setTimeout(resolve, 150));
  return MENU_ITEMS;
}

/**
 * Service to fetch menu categories
 * ASP.NET Core Endpoint target: GET /api/menu/categories
 */
export async function getCategories() {
  if (!API_CONFIG.USE_MOCK_DATA) {
    return await apiFetch('/menu/categories');
  }
  return CATEGORIES;
}

/**
 * Service to fetch single menu item by ID
 * ASP.NET Core Endpoint target: GET /api/menu/items/{id}
 */
export async function getMenuItemById(id) {
  if (!API_CONFIG.USE_MOCK_DATA) {
    return await apiFetch(`/menu/items/${id}`);
  }
  const item = MENU_ITEMS.find((m) => m.id === id);
  if (!item) throw new Error(`Menu item ${id} not found`);
  return item;
}

/**
 * API Configuration for future ASP.NET Core Web API integration
 * 
 * To switch from mock prototype to live backend:
 * 1. Set USE_MOCK_DATA to false
 * 2. Configure API_BASE_URL to point to your ASP.NET Core API (e.g., https://localhost:7001/api)
 */
export const API_CONFIG = {
  USE_MOCK_DATA: true,
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:7001/api',
  TIMEOUT_MS: 10000,
};

/**
 * Generic API client helper for fetch calls once ASP.NET backend is connected
 */
export async function apiFetch(endpoint, options = {}) {
  if (API_CONFIG.USE_MOCK_DATA) {
    throw new Error('API Client is currently set to USE_MOCK_DATA=true');
  }

  const url = `${API_CONFIG.API_BASE_URL}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'HTTP Request failed' }));
    throw new Error(errorData.message || `API error ${response.status}`);
  }

  return await response.json();
}

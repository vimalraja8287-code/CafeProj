import { useSearchParams } from 'react-router-dom';
import { CAFE_INFO } from '../data/menuData';
import { getStoredItem, setStoredItem, STORAGE_KEYS } from '../services/storageService';

export const AVAILABLE_TABLES = [1, 2, 3, 4, 5, 6];

/**
 * Custom hook to manage active table number.
 * Reads from URL ?table=N first (QR Code scan), then falls back to localStorage, then default (Table 1 or 3).
 */
export function useTableNumber() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTable = searchParams.get('table');

  let activeTable = CAFE_INFO.defaultTable;

  if (rawTable) {
    const parsed = parseInt(rawTable, 10);
    if (!isNaN(parsed) && parsed > 0) {
      activeTable = parsed;
      // Persist QR scan choice to localStorage
      setStoredItem(STORAGE_KEYS.TABLE, activeTable);
    }
  } else {
    // If no URL parameter, check stored choice from previous manual selection or QR scan
    const stored = getStoredItem(STORAGE_KEYS.TABLE, null);
    if (stored && !isNaN(stored) && stored > 0) {
      activeTable = Number(stored);
    }
  }

  const changeTable = (newTableNum) => {
    const num = Number(newTableNum);
    if (isNaN(num) || num <= 0) return;
    
    setStoredItem(STORAGE_KEYS.TABLE, num);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('table', num.toString());
      return next;
    }, { replace: true });
  };

  return {
    tableNumber: activeTable,
    changeTable,
    availableTables: AVAILABLE_TABLES,
    hasUrlTable: Boolean(rawTable),
  };
}

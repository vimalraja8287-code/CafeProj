/**
 * Formats a numeric value into INR currency string (e.g. ₹250 or ₹250.50)
 */
export function formatCurrency(amount) {
  const num = Number(amount) || 0;
  // If whole number, don't show decimals for cleaner cafe display, else show 2 decimals
  return `₹${num % 1 === 0 ? num : num.toFixed(2)}`;
}

/**
 * Formats ISO date string to readable time (e.g. 02:45 PM)
 */
export function formatTime(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Returns humanized relative time (e.g. "5 mins ago", "Just now")
 */
export function formatRelativeTime(isoString) {
  if (!isoString) return '';
  const now = new Date();
  const date = new Date(isoString);
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 30) return 'Just now';
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  const diffInMins = Math.floor(diffInSeconds / 60);
  if (diffInMins < 60) return `${diffInMins}m ago`;
  const diffInHours = Math.floor(diffInMins / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
}

/**
 * Maps order status to readable labels and color themes
 */
export function getStatusMeta(status) {
  switch (status?.toLowerCase()) {
    case 'new':
      return { label: 'New Order', bgClass: 'status-new', icon: 'Sparkles' };
    case 'preparing':
      return { label: 'Preparing', bgClass: 'status-prep', icon: 'ChefHat' };
    case 'ready':
      return { label: 'Ready for Pickup', bgClass: 'status-ready', icon: 'CheckCircle2' };
    case 'served':
      return { label: 'Served', bgClass: 'status-served', icon: 'Coffee' };
    case 'cancelled':
      return { label: 'Cancelled', bgClass: 'status-cancel', icon: 'XCircle' };
    default:
      return { label: status || 'Unknown', bgClass: 'status-served', icon: 'HelpCircle' };
  }
}

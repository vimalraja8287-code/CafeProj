import { useOrderContext } from '../context/OrderContext';

export function useOrders() {
  const {
    orders,
    loadingOrders,
    refreshOrders,
    placeOrder,
    updateOrderStatus,
    simulateIncomingOrder,
  } = useOrderContext();

  return {
    orders,
    loading: loadingOrders,
    refreshOrders,
    placeOrder,
    updateOrderStatus,
    simulateIncomingOrder,
  };
}

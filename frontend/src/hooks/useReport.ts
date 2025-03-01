import { useEffect, useState } from 'react';
import api from '../network/api';
import { OrderType } from '../types/orderType';

export function useReport() {
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    async function init() {
      const fetchedOrders = await api.GET_ORDERS();
      setOrders(fetchedOrders);
    }
    init();
  }, []);

  const pendingOrders = orders.filter(
    (order) => order.history![0].status === 'PENDING'
  );
  const inProgressOrders = orders.filter(
    (order) => order.history![0].status === 'PROGRESS'
  );
  const completedOrders = orders.filter(
    (order) => order.history![0].status === 'COMPLETED'
  );
  const canceledOrders = orders.filter(
    (order) => order.history![0].status === 'CANCELED'
  );

  const salesData = orders.reduce((acc, order) => {
    if (order.history![0].status === 'COMPLETED') {
      const month = new Date(order.deadline).toLocaleString('default', {
        month: 'short',
      });
      acc[month] = (acc[month] || 0) + order.quantity;
    }
    return acc;
  }, {} as Record<string, number>);

  const salesChartData = Object.entries(salesData).map(([month, quantity]) => ({
    month,
    quantity,
  }));

  return {
    orders,
    pendingOrders,
    inProgressOrders,
    completedOrders,
    canceledOrders,
    salesChartData,
  };
}

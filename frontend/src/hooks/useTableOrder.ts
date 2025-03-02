import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../network/api';
import { OrderType } from '../types/orderType';

export function useTableOrder() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderType[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      const fetchedOrders = await api.GET_ORDERS();
      setOrders(fetchedOrders);
      setFilteredOrders(fetchedOrders);
    }
    init();
  }, []);

  useEffect(() => {
    let filtered = orders;

    // Filter berdasarkan rentang tanggal
    if (startDate || endDate) {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.deadline);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        return (!start || orderDate >= start) && (!end || orderDate <= end);
      });
    }

    // Filter berdasarkan status
    if (selectedStatus) {
      filtered = filtered.filter(
        (order) => order.history![0].status === selectedStatus.toUpperCase()
      );
    }

    setFilteredOrders(filtered);
  }, [startDate, endDate, selectedStatus, orders]);

  return {
    orders,
    filteredOrders,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedStatus,
    setSelectedStatus,
    navigate,
  };
}

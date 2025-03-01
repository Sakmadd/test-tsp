import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import api from '../network/api';
import { HistoryType } from '../types/historyType';

export function useTrack() {
  const [searchId, setSearchId] = useState('');
  const [history, setHistory] = useState<HistoryType[]>();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSearch = async () => {
    if (!searchId.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a valid ID.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    try {
      const data = await api.GET_HISTORIES(searchId);

      const sortedHistory = data.sort(
        (a: HistoryType, b: HistoryType) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );

      setHistory(sortedHistory);
    } catch {
      toast({
        title: 'Error',
        description: 'History not found.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setHistory(undefined);
    } finally {
      setLoading(false);
    }
  };

  const calculateTimeDifference = (previous: string, current: string) => {
    const prevTime = new Date(previous).getTime();
    const currTime = new Date(current).getTime();
    const diffMs = currTime - prevTime;

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  return {
    searchId,
    setSearchId,
    history,
    loading,
    handleSearch,
    calculateTimeDifference,
  };
}

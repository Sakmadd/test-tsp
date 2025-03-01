import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Container } from '../component/container';
import api from '../network/api';
import { HistoryType } from '../types/historyType';

export function TrackPage() {
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

  return (
    <>
      <Flex flexDir={'column'} gap={'2rem'}>
        <Container>
          <Flex gap={2}>
            <Input
              placeholder="Enter Order ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <Button
              onClick={handleSearch}
              isLoading={loading}
              colorScheme="blue"
            >
              Search
            </Button>
          </Flex>
        </Container>

        <Container>
          <Box>
            {history && history.length > 0 ? (
              <VStack spacing={4} align="stretch">
                {history.map((entry, index) => (
                  <Box
                    key={entry.id}
                    p={4}
                    boxShadow="md"
                    borderRadius="md"
                    bg="gray.100"
                  >
                    <Text>
                      <strong>Status:</strong> {entry.status}
                    </Text>
                    <Text>
                      <strong>Description:</strong> {entry.description}
                    </Text>
                    <Text>
                      <strong>Timestamp:</strong>{' '}
                      {new Date(entry.timestamp).toLocaleString()}
                    </Text>
                    {index > 0 && (
                      <Text color="gray.600" fontSize="sm">
                        ⏳ Time since last update:{' '}
                        {calculateTimeDifference(
                          history[index - 1].timestamp.toString(),
                          entry.timestamp.toString()
                        )}
                      </Text>
                    )}
                  </Box>
                ))}
              </VStack>
            ) : (
              <Text>No history found.</Text>
            )}
          </Box>
        </Container>
      </Flex>
    </>
  );
}

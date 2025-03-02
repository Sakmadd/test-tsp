import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Text,
  VStack,
  Tag,
} from '@chakra-ui/react';
import { Container } from '../component/container';
import { useTrack } from '../hooks/useTrack';
import {
  FaCheckCircle,
  FaClock,
  FaSpinner,
  FaTimesCircle,
} from 'react-icons/fa';

const statusColorMap: Record<
  string,
  { icon: React.ElementType; color: string }
> = {
  PENDING: { icon: FaClock, color: 'blue' },
  PROGRESS: { icon: FaSpinner, color: 'yellow' },
  COMPLETED: { icon: FaCheckCircle, color: 'green' },
  CANCELED: { icon: FaTimesCircle, color: 'red' },
};

export function TrackPage() {
  const {
    calculateTimeDifference,
    handleSearch,
    history,
    loading,
    searchId,
    setSearchId,
  } = useTrack();

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
                {history.map((entry, index) => {
                  const { icon, color } = statusColorMap[entry.status] || {
                    icon: FaClock,
                    color: 'gray',
                  };

                  return (
                    <Box
                      key={entry.id}
                      p={5}
                      boxShadow="lg"
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="gray.300"
                      transition="all 0.3s"
                      _hover={{ boxShadow: 'xl', transform: 'scale(1.02)' }}
                    >
                      <Flex mb={2} alignItems={'center'}>
                        <Tag
                          size="md"
                          variant="solid"
                          colorScheme={color}
                          p={'8px'}
                        >
                          <Icon as={icon} boxSize={5} mr={3} />
                          {entry.status}
                        </Tag>
                      </Flex>
                      <Text>
                        <strong>Description:</strong> {entry.description}
                      </Text>
                      <Text color="gray.700">
                        <strong>Timestamp:</strong>{' '}
                        {new Date(entry.timestamp).toLocaleString()}
                      </Text>

                      {index > 0 && (
                        <Text color="gray.600" fontSize="sm" mt={2}>
                          last update:{' '}
                          {calculateTimeDifference(
                            history[index - 1].timestamp.toString(),
                            entry.timestamp.toString()
                          )}
                        </Text>
                      )}
                    </Box>
                  );
                })}
              </VStack>
            ) : (
              <Text color="gray.500" textAlign="center" fontSize="lg">
                No history found.
              </Text>
            )}
          </Box>
        </Container>
      </Flex>
    </>
  );
}

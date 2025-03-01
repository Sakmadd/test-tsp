import { Box, Button, Flex, Input, Text, VStack } from '@chakra-ui/react';
import { Container } from '../component/container';
import { useTrack } from '../hooks/useTrack';

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

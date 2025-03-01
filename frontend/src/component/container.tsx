import { Box } from '@chakra-ui/react';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export function Container({ children }: Props) {
  return (
    <>
      <Box backgroundColor={'white'} borderRadius={'md'} p={'2rem'}>
        {children}
      </Box>
    </>
  );
}

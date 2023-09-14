import React from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';

const NoMatch = () => (
  <Flex alignItems="center" flex="1" flexDirection="column" justifyContent="center">
    <Heading>Oops!</Heading>
    <Text>Sorry, that page doesn&apos;t exist...</Text>
  </Flex>
);

export default NoMatch;

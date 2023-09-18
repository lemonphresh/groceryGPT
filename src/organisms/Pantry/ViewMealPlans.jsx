import React from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { useAuth } from '../../contexts/useAuth';

const ViewMealPlans = () => {
  const { state } = useAuth();

  return (
    <Flex alignItems="center" flex="1" flexDirection="column" justifyContent="center">
      <Heading>View Meal Plans</Heading>
      <Text>beep boop</Text>
    </Flex>
  );
};

export default ViewMealPlans;

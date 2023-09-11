import { ChakraProvider, Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { inject } from '@vercel/analytics';
import theme from './theme';
import { Footer, TopContent } from './organisms';
import MealPrepIntake from './pages/MealPrepIntake';

const Root = () => {
  useEffect(() => {
    inject();
  }, []);

  return (
    <ChakraProvider theme={theme} initialColorMode={theme.config.initialColorMode}>
      <Flex
        backgroundColor={theme.colors.gray[100]}
        color={theme.colors.gray[700]}
        flexDirection="column"
        fontFamily={theme.fonts.body}
        width="100vw"
      >
        <TopContent />
        <MealPrepIntake />
        <Footer />
      </Flex>
    </ChakraProvider>
  );
};

export default Root;

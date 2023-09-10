import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import MealPrepIntake from './pages/MealPrepIntake';
import theme from './theme';
import { TopContent } from './organisms';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
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
      </Flex>
    </ChakraProvider>
  </React.StrictMode>
);

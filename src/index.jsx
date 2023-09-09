import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import MealPrepIntake from './pages/MealPrepIntake';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme} initialColorMode={theme.config.initialColorMode}>
      <Flex flexDirection="column" width="100vw">
        <MealPrepIntake />
      </Flex>
    </ChakraProvider>
  </React.StrictMode>
);

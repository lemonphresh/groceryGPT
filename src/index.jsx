import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import MealPrepIntake from './pages/MealPrepIntake';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme} initialColorMode={theme.config.initialColorMode}>
      <MealPrepIntake />
    </ChakraProvider>
  </React.StrictMode>
);

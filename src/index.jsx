import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/800.css';
import '@fontsource/roboto/400.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import MealPrepIntake from './pages/MealPrepIntake';
import theme from './theme';
import { Footer, TopContent } from './organisms';

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
        <Footer />
      </Flex>
    </ChakraProvider>
  </React.StrictMode>
);

import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/800.css';
import '@fontsource/roboto/400.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './contexts/useAuth';
import theme from './theme';
import routes from './routes';

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthContextProvider>
    <ChakraProvider theme={theme} initialColorMode={theme.config.initialColorMode}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ChakraProvider>
  </AuthContextProvider>
);

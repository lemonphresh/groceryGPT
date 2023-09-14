import { ChakraProvider, Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { inject } from '@vercel/analytics';
import { Outlet } from 'react-router-dom';
import theme from './theme';
import { Footer, NavBar, TopContent } from './organisms';

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
        minHeight="100vh"
        width="100vw"
      >
        <TopContent />
        <NavBar />
        <Outlet />
        <Footer />
      </Flex>
    </ChakraProvider>
  );
};

export default Root;

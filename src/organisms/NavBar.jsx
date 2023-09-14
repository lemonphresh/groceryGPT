import { Flex } from '@chakra-ui/react';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import theme from '../theme';
import { useAuth } from '../contexts/useAuth';
import { Button } from '../atoms';

const NavBar = () => {
  const { state } = useAuth();
  const location = useLocation();
  const notOnAuthPage = location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <Flex
      backgroundColor={
        notOnAuthPage ||
        (state.user && !location.pathname.includes('/pantry/') && theme.colors.gray[200])
      }
      alignItems="center"
      justifyContent="flex-end"
      paddingX="32px"
      paddingY="16px"
    >
      {state.user === null && notOnAuthPage && (
        <NavLink to="/register">
          <Button
            backgroundColor={theme.colors.pink[300]}
            textColor={theme.colors.white}
            text="Log In"
          />
        </NavLink>
      )}
      {state.user && !location.pathname.includes('/pantry/') && (
        <NavLink to={`/pantry/${state.user.id}`}>Go to your pantry</NavLink>
      )}
    </Flex>
  );
};

export default NavBar;

import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import theme from '../theme';
import { useAuth } from '../contexts/useAuth';
import { Button } from '../atoms';

const NavBar = () => {
  const { state } = useAuth();
  const location = useLocation();
  const notOnAuthPage = location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <Flex
      alignItems="center"
      backgroundColor={
        notOnAuthPage || (state.user && !location.pathname.includes('/pantry/'))
          ? theme.colors.green[200]
          : 'transparent'
      }
      boxShadow={
        (notOnAuthPage || (state.user && !location.pathname.includes('/pantry/'))) &&
        '-4px 4px 8px 2px rgba(0, 0, 0, 0.07)'
      }
      display={location.pathname.includes('/pantry/') ? 'none' : 'flex'}
      justifyContent={
        notOnAuthPage || (state.user && !location.pathname.includes('/pantry/'))
          ? 'center'
          : 'flex-end'
      }
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
        <NavLink to={`/pantry/${state.user.id}/home`}>
          <Text fontWeight="bold" _hover={{ '*': { paddingLeft: '2px' } }}>
            Go to pantry <ArrowForwardIcon />
          </Text>
        </NavLink>
      )}
    </Flex>
  );
};

export default NavBar;

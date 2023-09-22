import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flex, Text, theme } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useAuth } from '../../contexts/useAuth';
import { DecorativeHeading } from '../../atoms';

const PantryNavDesktop = () => {
  const { logout, state } = useAuth();
  const location = useLocation();

  return (
    <Flex
      backgroundColor={theme.colors.red[100]}
      display={['none', 'none', 'flex', 'flex']}
      flexDirection="column"
      height="100%"
      justifyContent="space-between"
      maxWidth={['100%', '196px', '196px', '224px']}
      width="100%"
    >
      <Flex flex="1" flexDirection="column" height="100%" margin="16px">
        {!location.pathname.includes('home') && (
          <Link to={`/pantry/${state.user.id}/home`}>
            <Flex
              alignItems="center"
              minHeight="32px"
              _hover={{
                fontWeight: 'bold',
              }}
            >
              <ChevronLeftIcon boxSize="20px" />
              <Text display="inline-block" marginLeft="8px">
                Pantry Home
              </Text>
            </Flex>
          </Link>
        )}
        <DecorativeHeading underlineColor={theme.colors.blue[200]}>Pantry</DecorativeHeading>
        <Link to={`/pantry/${state.user.id}/inventory/view`}>
          {' '}
          <Text
            borderBottom={
              location.pathname.includes('inventory/view')
                ? `2px solid ${theme.colors.pink[400]}`
                : 'none'
            }
            color={
              location.pathname.includes('inventory/view') ? theme.colors.pink[900] : 'inherit'
            }
            fontWeight={location.pathname.includes('inventory/view') ? 'bold' : 'normal'}
            marginBottom="8px"
            width="fit-content"
            _hover={{
              fontWeight: 'bold',
            }}
          >
            View current inventory
          </Text>
        </Link>
        <Link to={`/pantry/${state.user.id}/inventory/edit`}>
          <Text
            borderBottom={
              location.pathname.includes('inventory/edit')
                ? `2px solid ${theme.colors.pink[400]}`
                : 'none'
            }
            fontWeight={location.pathname.includes('inventory/edit') ? 'bold' : 'normal'}
            color={
              location.pathname.includes('inventory/edit') ? theme.colors.pink[900] : 'inherit'
            }
            width="fit-content"
            _hover={{
              fontWeight: 'bold',
            }}
          >
            Edit inventory
          </Text>
        </Link>
        <DecorativeHeading underlineColor={theme.colors.purple[200]}>Recipes</DecorativeHeading>
        <Link to={`/pantry/${state.user.id}/recipes/view`}>
          <Text
            borderBottom={
              location.pathname.includes('recipes/view')
                ? `2px solid ${theme.colors.pink[400]}`
                : 'none'
            }
            color={location.pathname.includes('recipes/view') ? theme.colors.pink[900] : 'inherit'}
            fontWeight={location.pathname.includes('recipes/view') ? 'bold' : 'normal'}
            marginBottom="8px"
            width="fit-content"
            _hover={{
              fontWeight: 'bold',
            }}
          >
            View saved recipes
          </Text>
        </Link>
        <Link to={`/pantry/${state.user.id}/recipes/edit`}>
          <Text
            borderBottom={
              location.pathname.includes('recipes/edit')
                ? `2px solid ${theme.colors.pink[400]}`
                : 'none'
            }
            color={location.pathname.includes('recipes/edit') ? theme.colors.pink[900] : 'inherit'}
            fontWeight={location.pathname.includes('recipes/edit') ? 'bold' : 'normal'}
            width="fit-content"
            _hover={{
              fontWeight: 'bold',
            }}
          >
            Manage recipes
          </Text>
        </Link>

        <Flex flex="1" flexDirection="column" justifyContent="flex-end">
          <Link to="/faq">
            <Text
              marginY="16px"
              _hover={{
                fontWeight: 'bold',
              }}
            >
              FAQ
            </Text>
          </Link>
          <Link onClick={logout} to="/">
            <Text
              marginBottom="16px"
              _hover={{
                fontWeight: 'bold',
              }}
            >
              Log Out
            </Text>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PantryNavDesktop;

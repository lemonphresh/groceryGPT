import { Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useAuth } from '../contexts/useAuth';
import theme from '../theme';
import { DecorativeHeading } from '../atoms';
import Spices from '../assets/spicespoons.png';

const UserPantry = () => {
  const { logout, state } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    if (state.user === null || parseInt(state.user.id, 10) !== parseInt(params.userId, 10)) {
      navigate('/');
    }
  }, [state.user]);

  return (
    state.user !== null && (
      <Flex flex="1" width="100%">
        <Flex
          alignItems="center"
          flexDirection={['column', 'column', 'row', 'row']}
          justifyContent="center"
          overflow="hidden"
          width="100%"
        >
          {/* left column for desktop, full width mobile */}
          <Flex
            backgroundColor={theme.colors.red[100]}
            flexDirection="column"
            height="100%"
            justifyContent="space-between"
            maxWidth={['100%', '100%', '196px', '224px']}
            width="100%"
          >
            <Flex flexDirection="column" margin="16px">
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
                    location.pathname.includes('inventory/view')
                      ? theme.colors.pink[900]
                      : 'inherit'
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
                    location.pathname.includes('inventory/edit')
                      ? theme.colors.pink[900]
                      : 'inherit'
                  }
                  width="fit-content"
                  _hover={{
                    fontWeight: 'bold',
                  }}
                >
                  Edit inventory
                </Text>
              </Link>
              <DecorativeHeading underlineColor={theme.colors.purple[200]}>
                Recipes
              </DecorativeHeading>
              <Link to={`/pantry/${state.user.id}/recipes/view`}>
                <Text
                  borderBottom={
                    location.pathname.includes('recipes/view')
                      ? `2px solid ${theme.colors.pink[400]}`
                      : 'none'
                  }
                  color={
                    location.pathname.includes('recipes/view') ? theme.colors.pink[900] : 'inherit'
                  }
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
                  color={
                    location.pathname.includes('recipes/edit') ? theme.colors.pink[900] : 'inherit'
                  }
                  fontWeight={location.pathname.includes('recipes/edit') ? 'bold' : 'normal'}
                  width="fit-content"
                  _hover={{
                    fontWeight: 'bold',
                  }}
                >
                  Manage recipes
                </Text>
              </Link>
            </Flex>
            <Flex display={['none', 'none', 'flex']} flexDirection="column" margin="16px">
              <Text marginBottom="8px">FAQ</Text>
              <Link onClick={logout} to="/">
                Log Out
              </Link>
            </Flex>
          </Flex>
          {/* right column on desktop, full width mobile */}
          <Flex
            alignItems="center"
            flexDirection="column"
            height="100%"
            paddingTop="16px"
            paddingX="16px"
            width="100%"
          >
            <Outlet />
            <Image
              aria-hidden
              filter="drop-shadow(-2px 4px 8px rgba(0, 0, 0, 0.3))"
              marginTop="32px"
              src={Spices}
              width="100%"
            />
          </Flex>
        </Flex>
      </Flex>
    )
  );
};

export default UserPantry;

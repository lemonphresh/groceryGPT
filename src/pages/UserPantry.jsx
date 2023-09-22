import { Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import theme from '../theme';
import Spices from '../assets/spicespoons.png';
import PantryNavDesktop from '../organisms/Pantry/PantryNavDesktop';
import PantryNavMobile from '../organisms/Pantry/PantryNavMobile';

const UserPantry = () => {
  const { logout, state } = useAuth();
  const navigate = useNavigate();
  const params = useParams();

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
          <PantryNavDesktop />
          <PantryNavMobile />
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
          <Flex
            alignItems="center"
            backgroundColor={theme.colors.pink[100]}
            display={['flex', 'flex', 'none']}
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
            width="100%"
            zIndex={1}
          >
            <Text
              borderBottom={`1px dashed ${theme.colors.pink[200]}`}
              paddingY="16px"
              width="100%"
              _hover={{
                fontWeight: 'bold',
              }}
            >
              <Link to="/faq">FAQ</Link>
            </Text>
            <Text
              paddingY="16px"
              _hover={{
                fontWeight: 'bold',
              }}
            >
              <Link onClick={logout} to="/">
                Log Out
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    )
  );
};

export default UserPantry;

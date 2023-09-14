import { Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

// - saved ingredients to start

const UserPantry = () => {
  const { state } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.user === null || state.user.id !== location.pathname.split('/')[2]) {
      navigate('/');
    }
  }, [state.user]);

  return state.user !== null && <Flex flex="1">user pantry for {state.user.username}</Flex>;
};

export default UserPantry;

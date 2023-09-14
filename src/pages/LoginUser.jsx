import {
  Alert,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { WarningIcon } from '@chakra-ui/icons';
import useForm from '../hooks/useForm';
import { useAuth } from '../contexts/useAuth';
import { Button } from '../atoms';
import regex from '../utils/regex';
import theme from '../theme';

const validateEmail = (email) => {
  if (!!email && email.length === 0) {
    return false;
  }
  return regex.isEmailValid(email);
};

const LoginUser = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [loginUserCb, setLoginUserCb] = useState(null);

  const { onChange, onSubmit, values } = useForm(loginUserCb, {
    email: null,
    password: null,
  });

  useEffect(() => {
    if (validateEmail(values.email)) {
      const callback = async () => {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, values);

        if (response.data.errors) {
          setErrors(response.data.errors);
          return;
        }

        if (response.data) {
          login(response.data);
          navigate('/');
        }
      };

      setLoginUserCb(() => callback);
    }
  }, [values]);

  const emailError = useCallback(() => validateEmail(values.email), [values.email]);

  return (
    <Flex alignItems="center" flex="1" flexDirection="column" justifyContent="center" width="100%">
      <Flex
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        marginY="64px"
        maxWidth="525px"
        paddingX={['8px', '16px']}
        width="100%"
      >
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gridGap: '16px',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Heading>Welcome back!</Heading>
          {errors.map((error) => (
            <Alert
              backgroundColor={theme.colors.pink[100]}
              borderRadius="8px"
              key={error.message}
              marginY="16px"
              textAlign="center"
            >
              <Text>
                <WarningIcon
                  alignSelf={['flex-start', undefined]}
                  color={theme.colors.pink[500]}
                  marginRight="8px"
                  marginBottom="4px"
                  height="14px"
                  width="14px"
                />
                {error.message}
              </Text>
            </Alert>
          ))}
          <FormControl isInvalid={emailError() && values.email?.length === 0} isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              autoComplete="email"
              backgroundColor={theme.colors.white}
              onChange={onChange}
              name="email"
              type="email"
            />
            {emailError() && <FormErrorMessage>Email is required.</FormErrorMessage>}
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              autoComplete="password"
              backgroundColor={theme.colors.white}
              defaultValue={values.password}
              onChange={onChange}
              name="password"
              type="password"
            />
          </FormControl>
          <Button
            alignSelf="center"
            disabled={!validateEmail(values.email) && values.password?.length > 0}
            marginTop="24px"
            onClick={onSubmit}
            text="Log In"
            width={['100%', '250px']}
          />
        </form>
        <Flex backgroundColor={theme.colors.gray[300]} height="2px" marginTop="24px" width="100%" />

        <Text marginTop="16px">
          New here? Go to{' '}
          <NavLink to="/register">
            <span style={{ color: theme.colors.blue[400], textDecoration: 'underline' }}>
              the register page
            </span>
            .
          </NavLink>
        </Text>
      </Flex>
    </Flex>
  );
};

export default LoginUser;

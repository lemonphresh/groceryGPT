import {
  Alert,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { InfoIcon, WarningIcon } from '@chakra-ui/icons';
import useForm from '../hooks/useForm';
import { useAuth } from '../contexts/useAuth';
import { Button, CarrotSpinner } from '../atoms';
import regex from '../utils/regex';
import theme from '../theme';
import useKeyboardInteractions from '../utils/useKeyboardInteractions';

const validateEmail = (email) => {
  if (!!email && email.length === 0) {
    return false;
  }
  return regex.isEmailValid(email);
};

const validatePasswords = (p1, p2) => p1 === p2;

const totalFormValidation = (values) =>
  values.password?.length > 0 &&
  values.confirmedPassword?.length > 0 &&
  validatePasswords(values.password, values.confirmedPassword) &&
  validateEmail(values.email) &&
  values.email?.length > 0 &&
  values.username?.length !== 0;

const RegisterUser = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [registerUserCb, setRegisterUserCb] = useState(null);
  const [res, setRes] = useState();
  const { performActionOnEnterOrSpace } = useKeyboardInteractions();

  const { onChange, onSubmit, values } = useForm(registerUserCb, {
    username: null,
    email: null,
    password: null,
    confirmedPassword: null,
  });

  useEffect(() => {
    if (totalFormValidation(values)) {
      const callback = async () => {
        setIsLoading(true);
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/register`, values);

        if (response.data.errors) {
          setErrors(response.data.errors);
          return;
        }

        if (response.data) {
          setRes(response.data);
          login(response.data);
        }
      };

      setRegisterUserCb(() => callback);
    }
  }, [values]);

  useEffect(() => {
    if (res) {
      setIsLoading(false);
      navigate('/');
    }
  }, [res]);

  const emailError = useCallback(() => validateEmail(values.email), [values.email]);
  const passwordError = useCallback(
    () => validatePasswords(values.password, values.confirmedPassword),
    [values.password, values.confirmedPassword]
  );

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
          <Heading>Get started</Heading>
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
          <FormControl isInvalid={values.username?.length === 0} isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              autoComplete="username"
              backgroundColor={theme.colors.white}
              maxLength={16}
              onChange={onChange}
              name="username"
              type="text"
            />
            <FormHelperText>
              <InfoIcon
                alignSelf={['flex-start', undefined]}
                color={theme.colors.green[400]}
                marginX="8px"
                marginBottom="4px"
                height="14px"
                width="14px"
              />
              Enter a username. (Max length of 16 characters.)
            </FormHelperText>
          </FormControl>
          <FormControl isInvalid={emailError() && values.email?.length === 0} isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              autoComplete="email"
              backgroundColor={theme.colors.white}
              onChange={onChange}
              name="email"
              type="email"
            />
            {!emailError() ? (
              <FormHelperText>Enter your email. (We&apos;ll never share this.)</FormHelperText>
            ) : (
              <FormErrorMessage>Email is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={passwordError() && values.password?.length === 0} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              autoComplete="new-password"
              backgroundColor={theme.colors.white}
              defaultValue={values.password}
              onChange={onChange}
              name="password"
              type="password"
            />
            {!passwordError() && values.password?.length === 0 ? (
              <FormHelperText>Enter your password.</FormHelperText>
            ) : (
              <FormErrorMessage>Passwords must match.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            isInvalid={passwordError() && values.confirmedPassword?.length === 0}
            isRequired
          >
            <FormLabel>Confirm password</FormLabel>
            <Input
              autoComplete="new-password"
              backgroundColor={theme.colors.white}
              defaultValue={values.confirmedPassword}
              onChange={onChange}
              name="confirmedPassword"
              type="password"
            />
            {!passwordError() && values.confirmedPassword?.length === 0 ? (
              <FormHelperText>Re-enter your password.</FormHelperText>
            ) : (
              <FormErrorMessage>Passwords must match.</FormErrorMessage>
            )}
          </FormControl>
          {isLoading && errors.length === 0 && (
            <Flex alignSelf="center" gridGap="16px" justifySelf="center">
              <CarrotSpinner key="carrot1" />
              <CarrotSpinner key="carrot2" />
              <CarrotSpinner key="carrot3" />
            </Flex>
          )}
          <Button
            alignSelf="center"
            disabled={!totalFormValidation(values)}
            marginTop="24px"
            onClick={onSubmit}
            onKeyUp={(e) => performActionOnEnterOrSpace(e, onSubmit)}
            text="Register"
            width={['100%', '250px']}
          />
        </form>

        <Flex backgroundColor={theme.colors.gray[300]} height="2px" marginTop="24px" width="100%" />

        <Text marginTop="16px">
          Already have an account?{' '}
          <NavLink to="/login">
            <span style={{ color: theme.colors.blue[400], textDecoration: 'underline' }}>
              Log in here
            </span>
            .
          </NavLink>
        </Text>
      </Flex>
    </Flex>
  );
};

export default RegisterUser;

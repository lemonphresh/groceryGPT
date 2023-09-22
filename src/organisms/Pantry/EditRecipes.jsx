import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import axios from 'axios';
import { v4 as uuid4 } from 'uuid';
import { DeleteIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import { CarrotSpinner } from '../../atoms';
import theme from '../../theme';
import MeasuringSpoons from '../../assets/measuringspoons.png';

const EditRecipes = () => {
  const { state } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/get-user-recipes`, {
        userId: state.user.id,
      });

      if (response.data.errors) {
        throw new Error('We could not fetch your recipes! Please try again.');
      }

      if (response.data) {
        setList(
          response.data.sort((a, b) => {
            const textA = a.name.toUpperCase();
            const textB = b.name.toUpperCase();
            // eslint-disable-next-line no-nested-ternary
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          })
        );
        setIsLoading(false);
      }
    };
    getList();
  }, []);

  const deleteRecipe = async (recipeId) => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/delete-recipe`, {
      userId: state.user.id,
      recipeId,
    });

    if (response.data === 'ok') {
      setList(list.filter((recipe) => recipe.id !== recipeId));
    }
  };

  return (
    <Flex
      alignItems="center"
      backgroundColor={theme.colors.pink[50]}
      borderRadius="14px"
      boxShadow="-3px 4px 8px 2px rgba(0, 0, 0, 0.1)"
      flex="1"
      flexDirection="column"
      marginY="48px"
      maxWidth={['100%', '512px']}
      padding="24px"
      paddingY="32px"
    >
      <Heading marginBottom="16px">Manage Recipes</Heading>
      <Text marginBottom="16px" marginX="8px">
        What&apos;s cookin&apos; good lookin&apos;? View and manage your recipe list here.
      </Text>
      {isLoading ? (
        <Flex alignSelf="center" gridGap="16px" justifySelf="center">
          <CarrotSpinner key="carrot1" />
          <CarrotSpinner key="carrot2" />
          <CarrotSpinner key="carrot3" />
        </Flex>
      ) : (
        <Flex alignItems="center" flexDirection="column" justifyContent="center">
          {list.length === 0 ? (
            <Flex alignItems="center" flexDirection="column" justifyContent="center" width="100%">
              <Image
                alt="A set of stainless steel measuring spoons."
                filter="drop-shadow(-2px 3px 8px rgba(0, 0, 0, 0.3))"
                src={MeasuringSpoons}
                width={['175px', '250px']}
              />
              <Heading marginBottom="24px" marginTop={['32px', '48px']} size="lg">
                Oh! You have no recipes saved.
              </Heading>
              <Text>
                Start generating meal plans and saving recipes{' '}
                <RouterLink to="/">
                  <span style={{ color: theme.colors.blue[400], textDecoration: 'underline' }}>
                    here
                  </span>
                </RouterLink>
                .
              </Text>
            </Flex>
          ) : (
            <UnorderedList
              alignSelf="flex-start"
              key={list}
              marginLeft="32px"
              maxWidth="100%"
              width="100%"
            >
              {list.map((item) => (
                <ListItem key={uuid4()}>
                  <Link color={theme.colors.blue[500]} href={item.link} target="_blank">
                    {item.name}
                  </Link>
                  <Box
                    backgroundColor={theme.colors.gray[600]}
                    display="inline-block"
                    height="2px"
                    marginBottom="4px"
                    marginX="8px"
                    width="8px"
                  />
                  <IconButton
                    backgroundColor={theme.colors.gray[300]}
                    color={theme.colors.red[400]}
                    height="24px"
                    icon={<DeleteIcon />}
                    minWidth="24px"
                    onClick={async () => {
                      await deleteRecipe(item.id);
                    }}
                    width="24px"
                  />
                </ListItem>
              ))}
            </UnorderedList>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default EditRecipes;

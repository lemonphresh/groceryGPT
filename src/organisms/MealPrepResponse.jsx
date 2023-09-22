import { Flex, Heading, IconButton, Link, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import JsPDF from 'jspdf';
import { BellIcon, CheckIcon, CopyIcon, DownloadIcon, SmallAddIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuid4 } from 'uuid';
import { Button, CarrotSpinner } from '../atoms';
import { ResponseMarkdown } from '../molecules';
import theme from '../theme';
import { useAuth } from '../contexts/useAuth';

const MealPrepResponse = ({ error, loading, response }) => {
  const { state } = useAuth();
  const navigate = useNavigate();

  const [recipeLinks, setRecipeLinks] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  // mm-dd-YYYY format
  const todaysDate = new Date(Date.now()).toLocaleString().split(', ')[0].replaceAll('/', '-');
  const generatePDF = () => {
    const report = new JsPDF('landscape', 'pt', 'a4');
    report.html(document.querySelector('#meal-prep-response')).then(() => {
      report.save(`meal_plan-${todaysDate}.pdf`);
    });
  };
  const copyText = async () => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(response);
    } else {
      document.execCommand('copy', true, response);
    }
  };

  const addRecipe = async ({ link, name }) => {
    const addedRecipe = await axios.post(`${process.env.REACT_APP_SERVER_URL}/create-recipe`, {
      userId: state.user.id,
      name,
      link,
    });

    if (addedRecipe) {
      setSavedRecipes([...savedRecipes, name]);
    }
  };

  useEffect(() => {
    if (loading === false && response) {
      const allLinksRegex = /\[([^[]+)\](\(.*\))/gm;
      const linkRegex = /^\[(.+)\]\(([^ ]+)( "(.+)")?\)$/;
      const listOfLinks = response.match(allLinksRegex);
      const setOfLinks = listOfLinks
        .map((link) => {
          const reg = link.match(linkRegex);
          if (reg) {
            return {
              name: reg[1],
              link: reg[2],
            };
          }
          return null;
        })
        .filter((item) => item);
      setRecipeLinks(setOfLinks);
    }
  }, [loading]);

  return (
    <>
      <Flex id="meal-prep-response" scrollMarginTop="100px" />
      <Flex
        backgroundColor={loading ? 'transparent' : '#ffffff8C'}
        boxShadow={!loading && '-3px 4px 8px 2px rgba(0, 0, 0, 0.2)'}
        display={!!error || !!loading || !!response ? 'flex' : 'none'}
        flexDirection="column"
        marginBottom="48px"
        marginTop="96px"
        maxWidth={['100%', '95vw', '85vw', '860px']}
        minHeight="90px"
        padding={['16px', '24px', '40px', '64px']}
        position="relative"
        width="100%"
      >
        {!!error && <Text color={theme.colors.red['200']}>{error}</Text>}
        {loading === true && (
          <Flex alignSelf="center" gridGap="16px" justifySelf="center">
            <CarrotSpinner key="carrot1" />
            <CarrotSpinner key="carrot2" />
            <CarrotSpinner key="carrot3" />
          </Flex>
        )}
        {loading === false && !!response && (
          <>
            <button
              aria-label="Copy this meal plan to your clipboard."
              onClick={copyText}
              style={{
                backgroundColor: theme.colors.green[300],
                borderRadius: '8px',
                boxShadow: '2px 1px 2px 0px rgba(0, 0, 0, 0.1)',
                padding: '4px',
                position: 'absolute',
                right: '64px',
                top: '24px',
              }}
              type="button"
            >
              <CopyIcon color={theme.colors.white} height="24px" width="24px" />
            </button>
            <button
              aria-label="Download your meal plan as a PDF."
              onClick={generatePDF}
              style={{
                backgroundColor: theme.colors.blue[300],
                borderRadius: '8px',
                boxShadow: '2px 1px 2px 0px rgba(0, 0, 0, 0.1)',
                padding: '4px',
                position: 'absolute',
                right: '24px',
                top: '24px',
              }}
              type="button"
            >
              <DownloadIcon color={theme.colors.white} height="24px" width="24px" />
            </button>
            <ResponseMarkdown response={response} />
          </>
        )}
      </Flex>
      {recipeLinks.length > 0 && (
        <Flex
          alignItems="center"
          backgroundColor={theme.colors.pink[50]}
          borderRadius="14px"
          boxShadow="-3px 4px 8px 2px rgba(0, 0, 0, 0.1)"
          flex="1"
          flexDirection="column"
          marginBottom="32px"
          maxWidth={['100%', '512px']}
          padding="24px"
          paddingY="32px"
          textAlign="center"
        >
          {state.user === null ? (
            <>
              <Heading marginBottom="16px" size="md">
                <BellIcon /> Want to save these recipes?
              </Heading>
              <Text>
                <RouterLink to="/login">
                  <span style={{ color: theme.colors.blue[400], textDecoration: 'underline' }}>
                    Log in
                  </span>
                </RouterLink>{' '}
                or{' '}
                <RouterLink to="/register">
                  <span style={{ color: theme.colors.blue[400], textDecoration: 'underline' }}>
                    register
                  </span>
                </RouterLink>{' '}
                to be able to <span style={{ fontWeight: 'bold' }}>save recipes</span> and{' '}
                <span style={{ fontWeight: 'bold' }}>keep inventory of your pantry</span> for easier
                meal prepping in the future.
              </Text>
            </>
          ) : (
            <>
              <Heading marginBottom="16px" size="md">
                <BellIcon /> Don&apos;t forget to save your recipes!
              </Heading>
              {recipeLinks.length > 0 && (
                <UnorderedList textAlign="left">
                  {recipeLinks.map((recipe) => (
                    <ListItem key={uuid4()}>
                      <Link
                        color={theme.colors.blue[400]}
                        href={recipe.link}
                        textDecoration="underline"
                      >
                        {recipe.name}
                      </Link>

                      <IconButton
                        aria-label={`Save ${recipe.name} to your recipes.`}
                        backgroundColor={
                          savedRecipes.indexOf(recipe.name) === -1
                            ? theme.colors.green[300]
                            : theme.colors.green[100]
                        }
                        color={theme.colors.white}
                        isDisabled={savedRecipes.indexOf(recipe.name) > -1}
                        height="24px"
                        icon={
                          savedRecipes.indexOf(recipe.name) === -1 ? (
                            <SmallAddIcon />
                          ) : (
                            <CheckIcon />
                          )
                        }
                        marginLeft="8px"
                        minWidth="24px"
                        onClick={async () => {
                          await addRecipe(recipe);
                        }}
                        width="24px"
                      />
                    </ListItem>
                  ))}
                </UnorderedList>
              )}

              <Button
                marginTop="16px"
                onClick={() => {
                  navigate(`/pantry/${state.user.id}/recipes/view`);
                }}
                text="View saved recipes"
              />
            </>
          )}
        </Flex>
      )}
    </>
  );
};

export default MealPrepResponse;

MealPrepResponse.defaultProps = {
  error: null,
  loading: false,
  response: null,
};

MealPrepResponse.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  response: PropTypes.string,
};

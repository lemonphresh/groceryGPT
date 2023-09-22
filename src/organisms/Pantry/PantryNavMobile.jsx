import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Text,
  theme,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useAuth } from '../../contexts/useAuth';
import { DecorativeHeading } from '../../atoms';

const PantryNavMobile = () => {
  const { state } = useAuth();
  const location = useLocation();

  return (
    <Flex
      backgroundColor={theme.colors.red[100]}
      boxShadow="-3px 4px 8px 2px rgba(0, 0, 0, 0.1)"
      display={['flex', 'flex', 'none', 'none']}
      flexDirection="column"
      height="100%"
      justifyContent="space-between"
      textAlign="center"
      width="100%"
    >
      <Flex flexDirection="column">
        {!location.pathname.includes('home') && (
          <Link to={`/pantry/${state.user.id}/home`}>
            <Flex
              alignItems="center"
              marginLeft="12px"
              minHeight="32px"
              paddingY="16px"
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
        <Accordion allowToggle borderColor="transparent">
          <AccordionItem
            borderBottom={`1px dashed ${theme.colors.pink[200]}`}
            borderTop={
              !location.pathname.includes('home') && `1px dashed ${theme.colors.pink[200]}`
            }
          >
            <AccordionButton height="64px">
              <Flex flex="1">
                <DecorativeHeading underlineColor={theme.colors.blue[200]}>
                  Pantry
                </DecorativeHeading>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel
              alignItems="center"
              backgroundColor={theme.colors.pink[200]}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              pb={4}
            >
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
                  marginY="16px"
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
                  marginY="16px"
                  width="fit-content"
                  _hover={{
                    fontWeight: 'bold',
                  }}
                >
                  Edit inventory
                </Text>
              </Link>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton height="64px">
              <Flex flex="1">
                <DecorativeHeading underlineColor={theme.colors.purple[200]}>
                  Recipes
                </DecorativeHeading>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel
              alignItems="center"
              backgroundColor={theme.colors.pink[200]}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              pb={4}
            >
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
                  marginY="16px"
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
                  marginY="16px"
                  width="fit-content"
                  _hover={{
                    fontWeight: 'bold',
                  }}
                >
                  Manage recipes
                </Text>
              </Link>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    </Flex>
  );
};

export default PantryNavMobile;

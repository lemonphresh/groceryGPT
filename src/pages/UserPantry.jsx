import { Flex, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useAuth } from '../contexts/useAuth';
import theme from '../theme';
import { DecorativeHeading } from '../atoms';

// - saved ingredients to start

// 1. initialize activeIngList with list from db (getIngredientsByUser)
// 2. use keyword input for it
// 2.a. keep track of activeIngList then bulk update on submit (editUserIngredients)
// 3. add clear all button (clearUserIngredients) (add a "are u sure" prompt)
// 4. display all cute

// - saved meal plans (not yet in graphql project)

// 1. track list by dates in accordions
// 2. be able to delete them from here

// maybe on desktop do a two column display
// on left, skinny menu, show "manage pantry inventory", "manage meal plans"
// on right, display the stuff
// on mobile, the skinny menu up top at full width with accordions for pantry inventory and meal plans
// on open mobile accordion, it'll show the lists for each respective thing

// after all this we'll want to add a button on the MealPrepIntakeForm to
// prepopulate the existing ingredients list if they want

// we will also want to add a "save to pantry" button for the meal plan

const UserPantry = () => {
  const { state } = useAuth();
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
                      Go back
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
                Meal Plans
              </DecorativeHeading>
              <Link to={`/pantry/${state.user.id}/meal-plans/view`}>
                <Text
                  borderBottom={
                    location.pathname.includes('meal-plans/view')
                      ? `2px solid ${theme.colors.pink[400]}`
                      : 'none'
                  }
                  color={
                    location.pathname.includes('meal-plans/view')
                      ? theme.colors.pink[900]
                      : 'inherit'
                  }
                  fontWeight={location.pathname.includes('meal-plans/view') ? 'bold' : 'normal'}
                  marginBottom="8px"
                  width="fit-content"
                  _hover={{
                    fontWeight: 'bold',
                  }}
                >
                  View saved meal plans
                </Text>
              </Link>
              <Link to={`/pantry/${state.user.id}/meal-plans/edit`}>
                <Text
                  borderBottom={
                    location.pathname.includes('meal-plans/edit')
                      ? `2px solid ${theme.colors.pink[400]}`
                      : 'none'
                  }
                  color={
                    location.pathname.includes('meal-plans/edit')
                      ? theme.colors.pink[900]
                      : 'inherit'
                  }
                  fontWeight={location.pathname.includes('meal-plans/edit') ? 'bold' : 'normal'}
                  width="fit-content"
                  _hover={{
                    fontWeight: 'bold',
                  }}
                >
                  Manage meal plans
                </Text>
              </Link>
            </Flex>
            <Flex display={['none', 'none', 'flex']} flexDirection="column">
              <Text marginBottom="8px">FAQ</Text>
              <Text>Log Out</Text>
            </Flex>
          </Flex>
          {/* right column on desktop, full width mobile */}
          <Flex
            alignItems="center"
            flexDirection="column"
            height="100%"
            padding="16px"
            width="100%"
          >
            <Outlet />
          </Flex>
        </Flex>
      </Flex>
    )
  );
};

export default UserPantry;

import React, { useEffect, useState } from 'react';
import { Flex, Heading, Image } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  CheckboxButtonGroup,
  KeywordInputForm,
  NumberInputWithLabel,
  RadioButtonGroup,
} from '../molecules';
import { useMealPrepIntakeValues } from '../contexts/useMealPrepIntakeValues/useMealPrepIntakeValues';
import { Button } from '../atoms';
import CuttingBoard from '../assets/cuttingboard.jpeg';
import theme from '../theme';
import Rosemary from '../assets/rosemary.png';
import WoodenSpoon from '../assets/woodenspoon.png';
import { useAuth } from '../contexts/useAuth';

// eslint-disable-next-line react/prop-types
const FormSection = ({ children }) => (
  <Flex backgroundColor="#ffffff8C" borderRadius="4px" flexDirection="column" padding="8px">
    {children}
  </Flex>
);

const MealPrepIntakeForm = ({ loading, onSubmit }) => {
  const { state } = useAuth();
  const { mealPrepIntakeFormValues, setMealPrepIntakeFormValues, formData } =
    useMealPrepIntakeValues();
  const [userPantryList, setUserPantryList] = useState([]);
  const [addToPantryButtonText, setAddToPantryButtonText] = useState(
    'Add your pantry inventory to list'
  );

  useEffect(() => {
    if (state.user) {
      const getList = async () => {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/get-user-ingredients`,
          {
            userId: state.user.id,
          }
        );

        if (response.data.errors) {
          throw new Error('We could not fetch your list! Please try again.');
        }

        if (response.data) {
          setUserPantryList(response.data.map((item) => item.name));
        }
      };

      getList();
    }
  }, []);

  const handleOnChange = (category) => (value) => {
    setMealPrepIntakeFormValues({
      ...mealPrepIntakeFormValues,
      [category]: value,
    });
  };

  const handleRemoveIngredient = (value) => {
    const idx = mealPrepIntakeFormValues.existing_ingredients.indexOf(value);

    if (idx > -1) {
      setMealPrepIntakeFormValues({
        ...mealPrepIntakeFormValues,
        existing_ingredients: mealPrepIntakeFormValues.existing_ingredients.filter(
          (i) => i !== value
        ),
      });
    }
  };

  const handleOnSubmit = async () => {
    const ingredientInputValue = document.getElementById('ingredientInput').value;
    let noDupes = [];
    if (ingredientInputValue) {
      const keywordArr = ingredientInputValue.split(',');
      noDupes = [
        ...new Set(
          keywordArr
            .map((i) => i.trim())
            .filter((i) => !mealPrepIntakeFormValues.existing_ingredients.includes(i) && i !== '')
        ),
      ];
    }
    window.location.href = '#meal-prep-response';
    await onSubmit(
      JSON.stringify({
        ...mealPrepIntakeFormValues,
        existing_ingredients: [...mealPrepIntakeFormValues.existing_ingredients, ...noDupes],
      })
    );
  };

  return (
    <Flex
      alignItems="center"
      backgroundImage={CuttingBoard}
      backgroundSize="contain"
      borderRadius={['0px', '24px']}
      borderTop="8px solid #3d260a"
      boxShadow="-3px 4px 8px 2px rgba(0, 0, 0, 0.7)"
      flexDirection="column"
      justifyContent="center"
      marginY="24px"
      maxWidth={['100%', '95vw', '90vw']}
      padding={['16px', '24px', '40px', '64px']}
      position="relative"
    >
      <Image
        alt="A sprig of rosemary"
        display={['none', 'block', 'block', 'block']}
        filter="drop-shadow(-5px 4px 8px rgba(0, 0, 0, 0.5))"
        left={['-275px', '-375px', '-400px', '-450px']}
        maxWidth={['100%', '95vw', '800px']}
        paddingX={['16px', '24px', '40px', '64px']}
        paddingY="24px"
        pointerEvents="none"
        position="absolute"
        top="20px"
        transform="rotate(116deg)"
        src={Rosemary}
        width="100%"
        zIndex="1"
      />
      <Image
        alt="Wooden spoon"
        bottom="175px"
        display={['none', 'block', 'block', 'block']}
        filter="drop-shadow(-5px 4px 8px rgba(0, 0, 0, 0.5))"
        marginTop={['64px', '64px', '32px', '48px']}
        maxWidth={['100%', '95vw', '1000px']}
        paddingX={['16px', '24px', '40px', '64px']}
        pointerEvents="none"
        position="absolute"
        right={['-275px', '-375px', '-400px', '-450px']}
        src={WoodenSpoon}
        transform={['rotate(-100deg)', 'rotate(-100deg)', 'rotate(-90deg)']}
        width="100%"
      />
      <Flex
        alignItems="center"
        backgroundColor="#ffffff8C"
        flexDirection="column"
        justifyContent="center"
        maxWidth={['600px', '800px']}
        padding={['12px', '16px', '24px']}
        width="100%"
      >
        <Heading
          backgroundSize={['auto', '1px 2.25rem']}
          boxShadow={[
            'none',
            `inset 0 0.175em transparent, inset 0 -0.5em ${theme.colors.purple[200]}`,
          ]}
          marginBottom="16px"
          marginTop={['16px', '24px']}
          marginX={['8px', '0px', '16px']}
          size="md"
          style={{ hyphens: 'auto' }}
        >
          Choose your cuisine:
        </Heading>
        <RadioButtonGroup
          buttons={formData.cuisine.map((cuisine) => ({
            ...cuisine,
          }))}
          onChange={handleOnChange('cuisine')}
          selectedButton={formData.cuisine[0]}
        />

        <Heading
          backgroundSize={['auto', '1px 2.25rem']}
          boxShadow={[
            'none',
            `inset 0 0.175em transparent, inset 0 -0.5em ${theme.colors.green[200]}`,
          ]}
          marginBottom="16px"
          marginTop="32px"
          marginX={['8px', '0px', '16px']}
          size="md"
          style={{ hyphens: 'auto' }}
        >
          Choose your meals:
        </Heading>
        <FormSection>
          <CheckboxButtonGroup
            buttons={formData.meals.map((meals) => ({
              ...meals,
            }))}
            onChange={handleOnChange('meals')}
            selectedButtons={mealPrepIntakeFormValues.meals}
          />
        </FormSection>

        <Heading
          backgroundSize={['auto', '1px 2.25rem']}
          boxShadow={[
            'none',
            `inset 0 0.175em transparent, inset 0 -0.5em ${theme.colors.yellow[200]}`,
          ]}
          marginBottom="16px"
          marginTop="32px"
          marginX={['8px', '0px', '16px']}
          size="md"
          style={{ hyphens: 'auto' }}
        >
          Select any dietary restrictions:
        </Heading>
        <FormSection>
          <CheckboxButtonGroup
            buttons={formData.dietary_restrictions.map((dietary_restrictions) => ({
              ...dietary_restrictions,
            }))}
            onChange={handleOnChange('dietary_restrictions')}
          />
        </FormSection>

        <Heading
          backgroundSize={['auto', '1px 2.25rem']}
          boxShadow={[
            'none',
            `inset 0 0.175em transparent, inset 0 -0.5em ${theme.colors.pink[200]}`,
          ]}
          marginBottom="16px"
          marginTop="32px"
          marginX={['8px', '0px', '16px']}
          size="md"
          style={{ hyphens: 'auto' }}
        >
          What ingredients do you already have?
        </Heading>
        <FormSection>
          {state.user !== null && userPantryList.length > 0 && (
            <Button
              backgroundColor={theme.colors.blue[300]}
              disabled={addToPantryButtonText === 'Added!'}
              margin="4px"
              onClick={() => {
                setMealPrepIntakeFormValues({
                  ...mealPrepIntakeFormValues,
                  existing_ingredients: [
                    ...mealPrepIntakeFormValues.existing_ingredients,
                    ...userPantryList,
                  ].sort(),
                });
                setAddToPantryButtonText('Added!');
              }}
              text={addToPantryButtonText}
            />
          )}
          <KeywordInputForm
            inputId="ingredientInput"
            keywords={mealPrepIntakeFormValues.existing_ingredients}
            onAddKeyword={handleOnChange('existing_ingredients')}
            onRemoveKeyword={handleRemoveIngredient}
          />
        </FormSection>

        <Flex
          alignItems="center"
          backgroundColor="#ffffff8C"
          borderRadius="4px"
          flexDirection="column"
          gridGap="8px"
          justifyContent="center"
          marginTop="32px"
          padding="8px"
          width={['100%', '100%', '80%']}
        >
          <NumberInputWithLabel
            labelText="Cooking for how many: "
            onChange={handleOnChange('person_count')}
            value={mealPrepIntakeFormValues.person_count}
          />
          <NumberInputWithLabel
            labelText="Servings per person per day: "
            onChange={handleOnChange('servings_per_person_per_day')}
            value={mealPrepIntakeFormValues.servings_per_person_per_day}
          />
        </Flex>

        <Button
          backgroundColor={theme.colors.red[500]}
          boxShadow="2px 2px 6px 0px rgba(0, 0, 0, 0.3)"
          disabled={loading}
          margin="16px"
          marginTop="32px"
          onClick={handleOnSubmit}
          padding="24px"
          text="Generate Meal Plan"
        />
      </Flex>
    </Flex>
  );
};

export default MealPrepIntakeForm;

MealPrepIntakeForm.propTypes = {
  loading: PropTypes.bool,
  onSubmit: PropTypes.func,
};

MealPrepIntakeForm.defaultProps = {
  loading: false,
  onSubmit: () => {},
};

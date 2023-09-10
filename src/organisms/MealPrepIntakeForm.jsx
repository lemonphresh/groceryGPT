import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { NumberInputWithLabel, RadioButtonGroup } from '../molecules';
import { useMealPrepIntakeValues } from '../contexts/useMealPrepIntakeValues/useMealPrepIntakeValues';
import CheckboxButtonGroup from '../molecules/CheckboxButtonGroup';
import KeywordInputForm from '../molecules/KeywordInputForm';
import { Button } from '../atoms';

// eslint-disable-next-line react/prop-types
const FormSection = ({ children }) => (
  <Flex backgroundColor="#ffffff8C" borderRadius="4px" padding="8px">
    {children}
  </Flex>
);

const MealPrepIntakeForm = ({ onSubmit }) => {
  const { mealPrepIntakeFormValues, setMealPrepIntakeFormValues, formData } =
    useMealPrepIntakeValues();

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

  return (
    <Flex
      alignItems="center"
      backgroundImage="https://www.photos-public-domain.com/wp-content/uploads/2012/03/bamboo-cutting-board-texture.jpg"
      backgroundSize="contain"
      borderRadius={['0px', '24px']}
      flexDirection="column"
      justifyContent="center"
      maxWidth={['100%', '90vw']}
      padding={['16px', '40px', '64px']}
    >
      <Flex
        alignItems="center"
        backgroundColor="#ffffff8C"
        flexDirection="column"
        justifyContent="center"
        maxWidth="600px"
        padding={['16px', '24px']}
        width="100%"
      >
        <Heading marginBottom="16px" marginTop={['16px', '24px']} size="md">
          Choose your cuisine:
        </Heading>
        <RadioButtonGroup
          buttons={formData.cuisine.map((cuisine) => ({
            ...cuisine,
          }))}
          onChange={handleOnChange('cuisine')}
          selectedButton={formData.cuisine[0]}
        />

        <Heading marginBottom="16px" marginTop="24px" size="md">
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

        <Heading marginBottom="16px" marginTop="24px" size="md">
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

        <Heading marginBottom="16px" marginTop="24px" size="md">
          What ingredients do you already have?
        </Heading>
        <FormSection>
          <KeywordInputForm
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
          marginTop="24px"
          padding="8px"
          width={['100%', '80%']}
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
          margin="16px"
          onClick={async () => {
            await onSubmit(JSON.stringify(mealPrepIntakeFormValues));
          }}
          text="Click for meals"
        />
      </Flex>
    </Flex>
  );
};

export default MealPrepIntakeForm;

MealPrepIntakeForm.propTypes = {
  onSubmit: PropTypes.func,
};

MealPrepIntakeForm.defaultProps = {
  onSubmit: () => {},
};

import React from 'react';
import { Flex } from '@chakra-ui/react';
import { RadioButtonGroup } from '../molecules';
import { useMealPrepIntakeValues } from '../contexts/useMealPrepIntakeValues/useMealPrepIntakeValues';
import CheckboxButtonGroup from '../molecules/CheckboxButtonGroup';

// it'll have:
//    - number of people input
//    - number of servings per day input
//    - meal types input
//    - cuisine type input
//    - dietary restrictions
//    - existing ingredients
//    - submit button
const MealPrepIntakeForm = () => {
  const { mealPrepIntakeFormValues, setMealPrepIntakeFormValues, formData } =
    useMealPrepIntakeValues();

  const handleOnChange = (category) => (value) => {
    setMealPrepIntakeFormValues({
      ...mealPrepIntakeFormValues,
      [category]: value,
    });
  };

  return (
    <Flex alignItems="center" flexDirection="column" justifyContent="center" paddingX="64px">
      meal prep intake
      <RadioButtonGroup
        buttons={formData.cuisine.map((cuisine) => ({
          ...cuisine,
        }))}
        onChange={handleOnChange('cuisine')}
      />
      <CheckboxButtonGroup
        buttons={formData.meals.map((meals) => ({
          ...meals,
        }))}
        onChange={handleOnChange('meals')}
      />
      <CheckboxButtonGroup
        buttons={formData.dietary_restrictions.map((dietary_restrictions) => ({
          ...dietary_restrictions,
        }))}
        onChange={handleOnChange('dietary_restrictions')}
      />
    </Flex>
  );
};

export default MealPrepIntakeForm;

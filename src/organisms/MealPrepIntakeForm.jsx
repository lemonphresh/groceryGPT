import React from 'react';
import { Flex } from '@chakra-ui/react';
import { NumberInputWithLabel, RadioButtonGroup } from '../molecules';
import { useMealPrepIntakeValues } from '../contexts/useMealPrepIntakeValues/useMealPrepIntakeValues';
import CheckboxButtonGroup from '../molecules/CheckboxButtonGroup';
import KeywordInputForm from '../molecules/KeywordInputForm';

// it'll have:
//    x number of people input
//    x number of servings per day input
//    x meal types input
//    x cuisine type input
//    x dietary restrictions
//    x existing ingredients
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
    <Flex alignItems="center" flexDirection="column" justifyContent="center" paddingX="64px">
      meal prep intake
      <Flex
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        maxWidth="600px"
        width="100%"
      >
        <RadioButtonGroup
          buttons={formData.cuisine.map((cuisine) => ({
            ...cuisine,
          }))}
          onChange={handleOnChange('cuisine')}
          selectedButton={formData.cuisine[0]}
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
        <KeywordInputForm
          keywords={mealPrepIntakeFormValues.existing_ingredients}
          onAddKeyword={handleOnChange('existing_ingredients')}
          onRemoveKeyword={handleRemoveIngredient}
        />

        <Flex
          alignItems="center"
          flexDirection={['row', 'column']}
          gridGap="8px"
          justifyContent="center"
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
      </Flex>
    </Flex>
  );
};

export default MealPrepIntakeForm;

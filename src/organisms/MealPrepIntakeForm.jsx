import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { NumberInputWithLabel, RadioButtonGroup } from '../molecules';
import { useMealPrepIntakeValues } from '../contexts/useMealPrepIntakeValues/useMealPrepIntakeValues';
import CheckboxButtonGroup from '../molecules/CheckboxButtonGroup';
import KeywordInputForm from '../molecules/KeywordInputForm';
import { Button } from '../atoms';
import CuttingBoard from '../assets/cuttingboard.jpeg';
import theme from '../theme';

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
    >
      <Flex
        alignItems="center"
        backgroundColor="#ffffff8C"
        flexDirection="column"
        justifyContent="center"
        maxWidth="600px"
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
          marginTop="32px"
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
          backgroundColor={theme.colors.red[500]}
          boxShadow="2px 2px 6px 0px rgba(0, 0, 0, 0.3)"
          margin="16px"
          marginTop="32px"
          onClick={async () => {
            await onSubmit(JSON.stringify(mealPrepIntakeFormValues));
          }}
          padding="24px"
          text="Generate Meal Plan"
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

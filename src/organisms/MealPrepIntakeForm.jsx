import React from 'react';
import { RadioButtonGroup } from '../molecules';
import { useMealPrepIntakeValues } from '../contexts/useMealPrepIntakeValues/useMealPrepIntakeValues';

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

  const onChangeRadioButton = (category) => (value) => {
    setMealPrepIntakeFormValues({
      [category]: value,
    });
  };

  //   const onChangeCheckboxButton = (category) => (value) => {
  //     const idx = mealPrepIntakeFormValues[category].indexOf(value);
  //     const valueExists = idx > -1;

  //     if (valueExists) {
  //       setMealPrepIntakeFormValues(mealPrepIntakeFormValues.splice(idx, 1));
  //     } else {
  //       setMealPrepIntakeFormValues({
  //         [category]: [...mealPrepIntakeFormValues[category], value],
  //       });
  //     }
  //   };

  console.log(mealPrepIntakeFormValues);

  return (
    <div>
      meal prep intake
      <RadioButtonGroup
        buttons={formData.cuisine.map((cuisine) => ({
          ...cuisine,
        }))}
        onChange={onChangeRadioButton('cuisine')}
      />
    </div>
  );
};

export default MealPrepIntakeForm;

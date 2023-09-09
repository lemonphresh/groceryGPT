import React, { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import defaultFormValues from './formValues';

const defaultMealPrepIntakeFormState = {
  mealPrepIntakeFormValues: {},
  setMealPrepIntakeFormValues: () => {},
};

const MealPrepIntakeFormContext = createContext(defaultMealPrepIntakeFormState);

export const MealPrepIntakeFormContextProvider = ({ children }) => {
  const defaultValues = {
    cuisine: null,
    dietary_restrictions: [],
    existing_ingredients: [],
    meals: [],
    person_count: 2,
    servings_per_person_per_day: 1,
  };
  const [_mealPrepIntakeFormValues, setMealPrepIntakeFormValues] = useState(defaultValues);
  const value = useMemo(
    () => ({
      mealPrepIntakeFormValues: _mealPrepIntakeFormValues,
      setMealPrepIntakeFormValues,
      defaultValues,
      formData: defaultFormValues,
    }),
    [_mealPrepIntakeFormValues, setMealPrepIntakeFormValues, defaultValues, defaultFormValues]
  );

  return (
    <MealPrepIntakeFormContext.Provider value={value}>
      {children}
    </MealPrepIntakeFormContext.Provider>
  );
};

export const useMealPrepIntakeValues = () => {
  const context = useContext(MealPrepIntakeFormContext);
  if (!context)
    throw new Error('MealPrepIntakeFormContext must be used with MealPrepIntakeFormContext!');
  return context;
};

MealPrepIntakeFormContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf([PropTypes.node])]),
};

MealPrepIntakeFormContextProvider.defaultProps = {
  children: undefined,
};

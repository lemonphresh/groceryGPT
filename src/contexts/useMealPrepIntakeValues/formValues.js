const defaultFormValues = {
  cuisine: [
    { text: 'All', value: 'all' },
    {
      text: 'Chinese',
      value: 'chinese',
    },
    {
      text: 'French',
      value: 'french',
    },
    {
      text: 'Greek',
      value: 'greek',
    },
    {
      text: 'Indian',
      value: 'indian',
    },
    {
      text: 'Japanese',
      value: 'japanese',
    },
    {
      text: 'Mexican',
      value: 'mexican',
    },
    {
      text: 'Middle Eastern',
      value: 'middleeastern',
    },
    {
      text: 'Spanish',
      value: 'spanish',
    },
    {
      text: 'Thai',
      value: 'thai',
    },
  ],
  dietary_restrictions: [
    {
      text: 'Dairy-Free',
      value: 'dairyfree',
    },
    {
      text: 'Gluten-Free',
      value: 'glutenfree',
    },
    {
      text: 'Halal',
      value: 'halal',
    },
    {
      text: 'Kosher',
      value: 'kosher',
    },
    {
      text: 'Low-Carb',
      value: 'lowcarb',
    },
    {
      text: 'Low-Fat',
      value: 'lowfat',
    },
    {
      text: 'Pescatarian',
      value: 'pescatarian',
    },
    {
      text: 'Vegan',
      value: 'vegan',
    },
    {
      text: 'Vegetarian',
      value: 'vegetarian',
    },
    {
      text: 'Whole30',
      value: 'wholethirty',
    },
  ],
  existing_ingredients: [],
  meals: [
    {
      text: 'Breakfast',
      value: 'breakfast',
    },
    {
      text: 'Lunch',
      value: 'lunch',
    },
    {
      text: 'Dinner',
      value: 'dinner',
    },
  ],
  person_count: 2,
  servings_per_person_per_day: 1,
};

export default defaultFormValues;

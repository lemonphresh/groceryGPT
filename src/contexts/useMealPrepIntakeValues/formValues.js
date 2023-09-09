const defaultFormValues = {
  cuisine: [
    {
      selected: false,
      text: 'Chinese',
      value: 'chinese',
    },
    {
      selected: false,
      text: 'French',
      value: 'french',
    },
    {
      selected: false,
      text: 'Greek',
      value: 'greek',
    },
    {
      selected: false,
      text: 'Indian',
      value: 'indian',
    },
    {
      selected: false,
      text: 'Japanese',
      value: 'japanese',
    },
    {
      selected: false,
      text: 'Mexican',
      value: 'mexican',
    },
    {
      selected: false,
      text: 'Middle Eastern',
      value: 'middleeastern',
    },
    {
      selected: false,
      text: 'Spanish',
      value: 'spanish',
    },
    {
      selected: false,
      text: 'Thai',
      value: 'thai',
    },
  ],
  dietary_restrictions: [
    {
      selected: false,
      text: 'Dairy-Free',
      value: 'dairyfree',
    },
    {
      selected: false,
      text: 'Gluten-Free',
      value: 'glutenfree',
    },
    {
      selected: false,
      text: 'Halal',
      value: 'halal',
    },
    {
      selected: false,
      text: 'Kosher',
      value: 'kosher',
    },
    {
      selected: false,
      text: 'Low-Carb',
      value: 'lowcarb',
    },
    {
      selected: false,
      text: 'Low-Fat',
      value: 'lowfat',
    },
    {
      selected: false,
      text: 'Pescatarian',
      value: 'pescatarian',
    },
    {
      selected: false,
      text: 'Vegan',
      value: 'vegan',
    },
    {
      selected: false,
      text: 'Vegetarian',
      value: 'vegetarian',
    },
    {
      selected: false,
      text: 'Whole30',
      value: 'wholethirty',
    },
  ],
  existing_ingredients: [],
  meals: [
    {
      selected: true,
      text: 'Breakfast',
      value: 'breakfast',
    },
    {
      selected: true,
      text: 'Lunch',
      value: 'lunch',
    },
    {
      selected: true,
      text: 'Dinner',
      value: 'dinner',
    },
  ],
  person_count: 2,
  servings_per_person_per_day: 1,
};

export default defaultFormValues;

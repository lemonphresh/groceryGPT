import React, { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';
import axios from 'axios';
import theme from '../theme';
import ResponseMarkdown from '../molecules/ResponseMarkdown';
import { Button, Spinner } from '../atoms';
import { MealPrepIntakeForm } from '../organisms';
import { MealPrepIntakeFormContextProvider } from '../contexts/useMealPrepIntakeValues/useMealPrepIntakeValues';

const App = () => {
  const userInput = `{ 
    "cuisine_type": "null",
    "dietary_restrictions": "[]", 
    "existing_ingredients": "['olive oil', 'salt', 'black pepper']",
    "meals": "['breakfast', 'lunch', 'dinner']",
    "person_count": "4", 
    "servings_per_person_per_day": "1"
  }`;
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const submitPrompts = async (prompt) => {
    const resp = await axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/chat`,
        { prompt },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      )
      .then(({ data }) => data.response)
      .catch((err) => {
        setError('Something went wrong. :(');
        // eslint-disable-next-line no-console
        console.log(err);
      });
    if (resp) {
      setResponse(resp);
    }
  };

  useEffect(() => {
    if (response) {
      setLoading(false);
    }
  }, [response]);

  return (
    <MealPrepIntakeFormContextProvider>
      <MealPrepIntakeForm />
      <Button
        onClick={async () => {
          setResponse(null);
          setLoading(true);
          await submitPrompts(userInput);
        }}
        text="Click for meals"
      />
      {!!error && <Text color={theme.colors.red['200']}>{error}</Text>}
      {loading && <Spinner />}
      {!!response && loading === false && <ResponseMarkdown response={response} />}
    </MealPrepIntakeFormContextProvider>
  );
};

export default App;

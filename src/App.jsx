import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';
import { Button, ChakraProvider, Link } from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import axios from 'axios';
import theme from './theme';

// might want to add remark-gfm library -- it works with task lists in markdown

// todo:

// - make new markdown component w theme
// - add form
//    - how many people
//    - dietary restrictions
//    - existing ingredients

const newTheme = {
  a: (props) => {
    const { children, href } = props;
    return (
      <Link color="blue" fontWeight={theme.fontWeights.bold} href={href} mb={2} fontSize="12px">
        {children}
      </Link>
    );
  },
};

const App = () => {
  // const defaultPrompt1 =
  //   '4 people, 3 meals a day per person, dietary restrictions: [sugar free, vegetarian], budget: $65';
  const defaultPrompt2 =
    "4 people, dietary_restrictions: ['vegetarian', 'nut allergy'], existing_ingredients: ['olive oil', 'salt', 'black pepper']";
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);

  const submitPrompts = async (prompt) => {
    const resp = await axios({
      method: 'post',
      url: 'http://localhost:3001/chat',
      data: { prompt },
    })
      .then(({ data }) => data)
      .catch((error) => console.log(error));
    setResponse(resp.message);
  };

  useEffect(() => {
    if (response) {
      setLoading(false);
    }
  }, [response]);

  return (
    <ChakraProvider theme={theme} initialColorMode={theme.config.initialColorMode}>
      <div>
        <Button
          onClick={async () => {
            await submitPrompts(defaultPrompt2);
          }}
        >
          Click for meals
        </Button>
        {loading && (
          <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
            # loading
          </ReactMarkdown>
        )}
        {!!response && !loading && (
          <ReactMarkdown components={ChakraUIRenderer(newTheme)} skipHtml>
            {response}
          </ReactMarkdown>
        )}
      </div>
    </ChakraProvider>
  );
};

export default App;

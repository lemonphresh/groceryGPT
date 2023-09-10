import React, { useEffect, useState } from 'react';
import { Flex, Heading, Image, Link } from '@chakra-ui/react';
import axios from 'axios';
import theme from '../theme';
import { MealPrepIntakeForm, MealPrepResponse } from '../organisms';
import { MealPrepIntakeFormContextProvider } from '../contexts/useMealPrepIntakeValues/useMealPrepIntakeValues';
import WoodenSpoon from '../assets/woodenspoon.png';
import CrackedEgg from '../assets/cracked_egg.png';

const App = () => {
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

  const handleSubmit = async (prompt) => {
    setResponse(null);
    setLoading(true);
    await submitPrompts(prompt);
  };

  useEffect(() => {
    if (response) {
      setLoading(false);
    }
  }, [response]);

  return (
    <MealPrepIntakeFormContextProvider>
      <Flex
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        marginTop={['0px', '24px']}
      >
        <Flex
          borderLeft={['none', `6px solid ${theme.colors.blue['200']}`]}
          marginBottom={['0px', '16px']}
          marginTop="16px"
          maxWidth="420px"
          paddingX="8px"
        >
          <Heading
            alignItems="center"
            fontFamily={theme.fonts.introText}
            fontWeight="normal"
            justifyContent="center"
            size="md"
          >
            <span style={{ fontWeight: 'bold' }}>
              Tired of figuring out what to cook every week?
            </span>{' '}
            Me, too. That&apos;s why I built this tool to have the magic robots in your computer do
            it for us.
          </Heading>
        </Flex>
        <MealPrepIntakeForm onSubmit={handleSubmit} />
        <MealPrepResponse error={error} loading={loading} response={response} />
        <Image
          alt="Wooden spoon"
          filter="drop-shadow(-5px 4px 8px rgba(0, 0, 0, 0.5))"
          marginY="64px"
          maxWidth={['100%', '95vw', '1000px']}
          paddingX={['16px', '24px', '40px', '64px']}
          src={WoodenSpoon}
          width="100%"
        />
        <Flex
          alignItems="center"
          flexDirection={['column-reverse', 'row']}
          maxWidth={['100%', '95vw', '1000px']}
          paddingX={['16px', '24px', '40px', '64px']}
        >
          <Image
            alt="A cracked egg with the egg white and yolk spilling out."
            height="150px"
            src={CrackedEgg}
          />
          <Heading
            alignItems="center"
            fontFamily={theme.fonts.introText}
            fontWeight="normal"
            fontSize="18px"
            justifyContent="center"
            marginY={['24px', 'auto']}
            size="md"
          >
            <span style={{ fontWeight: 'bold' }}>Disclaimer:</span> the robots do not always obey.
            Please try again if the response seems a little goofy. If they are being particularly
            unruly,{' '}
            <Link color={theme.colors.blue[400]} href="mailto:lemon.tsx@gmail.com">
              contact me
            </Link>
            .
          </Heading>
        </Flex>
      </Flex>
    </MealPrepIntakeFormContextProvider>
  );
};

export default App;

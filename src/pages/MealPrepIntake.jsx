import React, { useEffect, useState } from 'react';
import { Flex, Heading, Image, Link } from '@chakra-ui/react';
import axios from 'axios';
import theme from '../theme';
import { MealPrepIntakeForm, MealPrepResponse } from '../organisms';
import { MealPrepIntakeFormContextProvider } from '../contexts/useMealPrepIntakeValues/useMealPrepIntakeValues';
import Egg from '../assets/friedegg.png';

const MealPrepIntake = () => {
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
        marginBottom="64px"
        marginTop={['0px', '24px']}
        overflow="hidden"
      >
        <Flex
          borderLeft={['none', `6px solid ${theme.colors.blue['200']}`]}
          marginBottom={['0px', '16px']}
          marginTop="16px"
          maxWidth="420px"
          paddingX="16px"
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
        <MealPrepIntakeForm loading={loading} onSubmit={handleSubmit} />
        <MealPrepResponse error={error} loading={loading} response={response} />
        <Flex
          alignItems="center"
          flexDirection={['column-reverse', 'column-reverse', 'row', 'row']}
          maxWidth={['100%', '95vw', '1000px']}
          paddingX={['16px', '24px', '40px', '64px']}
        >
          <Image
            alt="A sunny-side-up egg with gorgeous crispy edges and a rich yellow yolk."
            filter="drop-shadow(-2px 3px 8px rgba(0, 0, 0, 0.3))"
            paddingY="16px"
            src={Egg}
            width={['200px', '275px', '325px']}
          />
          <Heading
            alignItems="center"
            fontFamily={theme.fonts.introText}
            fontWeight="normal"
            fontSize="18px"
            justifyContent="center"
            marginLeft={['0px', '0px', '24px', '24px']}
            marginY={['48px', '48px', 'auto', 'auto']}
            size="md"
          >
            <span style={{ fontWeight: 'bold' }}>Disclaimer:</span> the robots do not always like to
            obey. Please try again if the response seems a little goofy. If they are being
            particularly unruly,{' '}
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

export default MealPrepIntake;

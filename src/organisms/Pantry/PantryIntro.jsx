import React from 'react';
import { Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useAuth } from '../../contexts/useAuth';
import theme from '../../theme';
import Pencil from '../../assets/pencil.png';
import PencilShavings from '../../assets/pencilshavings.png';

const PantryIntro = () => {
  const { state } = useAuth();

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-around"
      marginY={['48px', '64px']}
      maxWidth={['100%', '512px']}
      textAlign="center"
    >
      <Image
        alt="A yellow pencil with a sharp point and pink eraser."
        filter="drop-shadow(-2px 4px 8px rgba(0, 0, 0, 0.3))"
        paddingX={['8px', '24px']}
        src={Pencil}
        width="100%"
      />
      <Heading marginBottom="32px" marginTop="64px" size="lg">
        Welcome to your pantry, {state.user.username}!
      </Heading>
      <Text>
        This is where you can{' '}
        <span style={{ fontWeight: theme.fontWeights.bold }}>keep track of ingredients</span>{' '}
        you&apos;ve got on hand by{' '}
        <span style={{ fontWeight: theme.fontWeights.bold }}>adding</span> them,{' '}
        <span style={{ fontWeight: theme.fontWeights.bold }}>editing</span> your existing list, or{' '}
        <span style={{ fontWeight: theme.fontWeights.bold }}>clearing</span> it altogether.
        You&apos;ll also be able to{' '}
        <span style={{ fontWeight: theme.fontWeights.bold }}>
          access all of your saved meal plans
        </span>
        , organized by date saved.
      </Text>
      <Image
        alt="A line of pencil shavings."
        filter="drop-shadow(-2px 4px 8px rgba(0, 0, 0, 0.3))"
        paddingX={['8px', '24px']}
        src={PencilShavings}
        width="100%"
      />
    </Flex>
  );
};

export default PantryIntro;

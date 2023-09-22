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
        transform="rotate(-7deg)"
        width="100%"
      />
      <Heading marginBottom="32px" marginTop="64px" size="lg">
        Welcome to your pantry,{' '}
        <span style={{ color: theme.colors.pink[600] }}>{state.user.username}</span>!
      </Heading>
      <Text>
        This is where you can{' '}
        <span style={{ fontWeight: theme.fontWeights.bold }}>keep track of ingredients</span>{' '}
        you&apos;ve got on hand by{' '}
        <span style={{ fontWeight: theme.fontWeights.bold }}>adding</span> to or{' '}
        <span style={{ fontWeight: theme.fontWeights.bold }}>editing</span> your existing inventory.
        You&apos;ll also be able to{' '}
        <span style={{ fontWeight: theme.fontWeights.bold }}>access all of your saved recipes</span>
        .
      </Text>
      <Image
        alt="A line of pencil shavings."
        filter="drop-shadow(-2px 4px 8px rgba(0, 0, 0, 0.3))"
        paddingX={['8px', '24px']}
        src={PencilShavings}
        transform="rotate(7deg)"
        width="100%"
      />
    </Flex>
  );
};

export default PantryIntro;

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import theme from '../theme';

const QAList = [
  {
    q: <Text>How does the meal plan generation work?</Text>,
    a: (
      <Text>
        I send the data entered from the Meal Plan form through a series of tubes to a magic robot
        (an AI model) supplied to me by{' '}
        <Link color={theme.colors.purple[500]} fontWeight="bold" href="https://openai.com/">
          OpenAI
        </Link>
        . Alongside that form data, I provide the robot with a very specific prompt so that it gives
        us back a very specific response. It can sometimes take a bit to think, and it does not
        always get the response right, but I think we can call relate to that.
      </Text>
    ),
  },
  {
    q: <Text>All of my recipes are coming from AllRecipes. Is that on purpose?</Text>,
    a: (
      <Text>
        Right now, yes. I am actively working to further augment the prompt I give to the magic
        robots so they can offer me a more diverse set of recipes in each response.
      </Text>
    ),
  },
  {
    q: <Text>What if I would like to request a feature?</Text>,
    a: (
      <Text>
        I would encourage you to{' '}
        <Link color={theme.colors.purple[500]} fontWeight="bold" href="mailto:lemon.tsx@gmail.com">
          contact me
        </Link>
        .
      </Text>
    ),
  },
  {
    q: <Text>Are you available for freelancing?</Text>,
    a: (
      <Text>
        I sure am!{' '}
        <Link color={theme.colors.purple[500]} fontWeight="bold" href="mailto:lemon.tsx@gmail.com">
          Let&apos;s get in touch
        </Link>
        .
      </Text>
    ),
  },
  {
    q: <Text>I love this product and also you. How can I support you?</Text>,
    a: (
      <Text>
        First of all, thank you. Secondly,{' '}
        <Link
          color={theme.colors.purple[500]}
          fontWeight="bold"
          href="https://cash.app/$lemonlikesgirls/5.00"
          target="_blank"
        >
          I accept CashApp donations
        </Link>
        .
      </Text>
    ),
  },
  //   {
  //     q: <Text>stuff</Text>,
  //     a: <Text>stuff</Text>,
  //   },
];

const Faq = () => (
  <Flex alignItems="center" flex="1" flexDirection="column" width="100%">
    <Heading marginY="32px" size="lg">
      FAQ
    </Heading>
    <Accordion
      allowToggle
      borderColor="transparent"
      maxWidth={['100%', '420px', '512px']}
      width="100%"
    >
      {QAList.map((i, idx) => (
        <AccordionItem
          borderBottom={
            (idx > QAList.length - 1 || idx !== 0) && `1px dashed ${theme.colors.pink[200]}`
          }
          borderTop={
            (idx === 0 || idx < QAList.length - 1) && `1px dashed ${theme.colors.pink[200]}`
          }
        >
          <AccordionButton backgroundColor={theme.colors.gray[50]} height="64px">
            <Flex flex="1">
              <Heading size="sm" textAlign="left">
                {i.q}
              </Heading>
            </Flex>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel
            alignItems="center"
            backgroundColor={theme.colors.gray[200]}
            display="flex"
            flexDirection="column"
            paddingY={4}
            textAlign="left"
          >
            {i.a}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  </Flex>
);

export default Faq;

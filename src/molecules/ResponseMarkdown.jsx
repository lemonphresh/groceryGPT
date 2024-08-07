import React from 'react';
import { Box, Heading, Link, UnorderedList } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Markdown from '../atoms/Markdown';
import theme from '../theme';
import { DecorativeHeading } from '../atoms';

const customTheme = {
  a: (props) => {
    const { children, href } = props;
    return (
      <Link
        color={theme.colors.red[400]}
        display="inline-flex"
        fontSize="20px"
        fontWeight={theme.fontWeights.bold}
        href={href}
        marginX="8px"
        target="_blank"
        textDecor="underline"
      >
        {children}
      </Link>
    );
  },
  h4: (props) => {
    const { children } = props;
    return (
      <DecorativeHeading fontSize="24px" size="md">
        {children}
      </DecorativeHeading>
    );
  },
  h5: (props) => {
    const { children } = props;
    return (
      <Heading
        display="inline-flex"
        fontSize="20px"
        fontWeight={theme.fontWeights.bold}
        marginBottom="16px"
        size="sm"
      >
        {children}
      </Heading>
    );
  },
  hr: () => (
    <Box
      borderTop={`2px dotted ${theme.colors.gray[300]}`}
      height="1px"
      marginTop="24px"
      width="100%"
    />
  ),
  ul: (props) => {
    const { children } = props;
    return (
      <UnorderedList fontSize="16px" marginY="16px">
        {children}
      </UnorderedList>
    );
  },
};

const ResponseMarkdown = ({ response }) => (
  <Markdown customTheme={customTheme}>{response}</Markdown>
);

export default ResponseMarkdown;

ResponseMarkdown.propTypes = {
  response: PropTypes.string,
};

ResponseMarkdown.defaultProps = {
  response: null,
};

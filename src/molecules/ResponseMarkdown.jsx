import React from 'react';
import { Box, Heading, Link, UnorderedList } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Markdown from '../atoms/Markdown';
import theme from '../theme';

const customTheme = {
  a: (props) => {
    const { children, href } = props;
    return (
      <Link
        color={theme.colors.red[400]}
        display="inline-flex"
        fontSize="18px"
        fontWeight={theme.fontWeights.bold}
        href={href}
        marginLeft="16px"
        paddingTop="8px"
        textDecor="underline"
      >
        {children}
      </Link>
    );
  },
  h4: (props) => {
    const { children } = props;
    return (
      <Heading
        fontSize="24px"
        fontWeight={theme.fontWeights.bold}
        marginBottom="16px"
        marginTop="30px"
        paddingBottom="16px"
        position="relative"
        size="md"
        width="fit-content"
        zIndex={1}
        _after={{
          background: theme.colors.yellow[200],
          bottom: '12px',
          content: `""`,
          height: '14px',
          left: '70%',
          position: 'absolute',
          transform: 'skew(-12deg) translateX(-50%)',
          width: '80%',
          zIndex: -1,
        }}
      >
        {children}
      </Heading>
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

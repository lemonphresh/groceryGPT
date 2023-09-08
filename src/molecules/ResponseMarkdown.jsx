import React from 'react';
import { Link } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Markdown from '../atoms/Markdown';
import theme from '../theme';

const customTheme = {
  a: (props) => {
    const { children, href } = props;
    return (
      <Link color="blue" fontWeight={theme.fontWeights.bold} href={href} mb={2} fontSize="12px">
        {children}
      </Link>
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

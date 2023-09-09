/* eslint-disable react/forbid-prop-types */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import PropTypes from 'prop-types';

const Markdown = ({ children, customTheme }) => (
  <ReactMarkdown components={ChakraUIRenderer(customTheme)} skipHtml>
    {children}
  </ReactMarkdown>
);

export default Markdown;

Markdown.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf([PropTypes.node])]),
  customTheme: PropTypes.any,
};

Markdown.defaultProps = {
  children: null,
  customTheme: {},
};

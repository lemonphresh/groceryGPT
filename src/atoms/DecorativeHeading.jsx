import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@chakra-ui/react';
import theme from '../theme';

const DecorativeHeading = ({ children, underlineColor, ...props }) => (
  <Heading
    marginY="16px"
    marginBottom="16px"
    marginTop="30px"
    paddingBottom="16px"
    position="relative"
    size="md"
    width="fit-content"
    zIndex="0"
    {...props}
    _after={{
      background: underlineColor,
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

export default DecorativeHeading;

DecorativeHeading.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf([PropTypes.node])]),
  underlineColor: PropTypes.string,
};

DecorativeHeading.defaultProps = {
  children: null,
  underlineColor: theme.colors.red[200],
};

import React from 'react';
import PropTypes from 'prop-types';
import { Button as ChakraButton } from '@chakra-ui/react';
import theme from '../theme';

const Button = ({ backgroundColor, disabled, onClick, rounded, textColor, text, ...props }) => {
  const borderRadius = rounded ? '18px' : '10px';

  return (
    <ChakraButton
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      color={textColor}
      onClick={onClick}
      isDisabled={disabled}
      _hover={{
        backgroundColor: !disabled && theme.colors.gray[50],
        color: !disabled && theme.colors.gray[600],
      }}
      {...props}
    >
      {text}
    </ChakraButton>
  );
};

export default Button;

Button.propTypes = {
  backgroundColor: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  rounded: PropTypes.bool,
  text: PropTypes.string,
  textColor: PropTypes.string,
};

Button.defaultProps = {
  backgroundColor: theme.colors.pink['500'],
  disabled: false,
  onClick: () => {},
  rounded: false,
  text: 'Button Text',
  textColor: theme.colors.white,
};

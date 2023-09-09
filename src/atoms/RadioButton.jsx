import React from 'react';
import PropTypes from 'prop-types';
import { Box, useRadio } from '@chakra-ui/react';
import theme from '../theme';

const RadioButton = ({ checkedBackgroundColor, onClick, rounded, textColor, text, ...props }) => {
  const borderRadius = rounded ? '18px' : '10px';
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" cursor="pointer">
      <input {...input} hidden />
      <Box
        backgroundColor={theme.colors.gray['300']}
        borderRadius={borderRadius}
        color={textColor}
        padding="8px"
        {...checkbox}
        _checked={{ backgroundColor: checkedBackgroundColor }}
      >
        {text}
      </Box>
    </Box>
  );
};

export default RadioButton;

RadioButton.propTypes = {
  checkedBackgroundColor: PropTypes.string,
  onClick: PropTypes.func,
  rounded: PropTypes.bool,
  text: PropTypes.string,
  textColor: PropTypes.string,
};

RadioButton.defaultProps = {
  checkedBackgroundColor: theme.colors.green['300'],
  onClick: () => {},
  rounded: false,
  text: 'Button Text',
  textColor: theme.colors.white,
};

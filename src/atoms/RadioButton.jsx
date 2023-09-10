import React from 'react';
import PropTypes from 'prop-types';
import { Flex, useRadio } from '@chakra-ui/react';
import theme from '../theme';

const RadioButton = ({ onClick, rounded, selectedBackgroundColor, textColor, text, ...props }) => {
  const borderRadius = rounded ? '18px' : '10px';
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Flex alignItems="center" as="label" cursor="pointer" justifyContent="center" tabIndex={0}>
      <input {...input} hidden />
      <Flex
        alignItems="center"
        backgroundColor={theme.colors.gray['300']}
        borderRadius={borderRadius}
        color={textColor}
        justifyContent="center"
        minWidth="54px"
        padding="8px"
        {...checkbox}
        _checked={{ backgroundColor: selectedBackgroundColor }}
      >
        {text}
      </Flex>
    </Flex>
  );
};

export default RadioButton;

RadioButton.propTypes = {
  onClick: PropTypes.func,
  rounded: PropTypes.bool,
  selectedBackgroundColor: PropTypes.string,
  text: PropTypes.string,
  textColor: PropTypes.string,
};

RadioButton.defaultProps = {
  onClick: () => {},
  rounded: false,
  selectedBackgroundColor: theme.colors.green['500'],
  text: 'Button Text',
  textColor: theme.colors.white,
};

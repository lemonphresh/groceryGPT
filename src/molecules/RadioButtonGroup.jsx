import { Flex, useRadioGroup } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid4 } from 'uuid';
import theme from '../theme';
import RadioButton from '../atoms/RadioButton';

const RadioButtonGroup = ({ buttons, onChange, selectedBackgroundColor, selectedButton }) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue: selectedButton ? selectedButton.value : buttons[0].value,
    name: selectedButton ? selectedButton.text : buttons[0].text,
    onChange,
  });

  const group = getRootProps();

  return (
    <Flex
      alignItems="center"
      flexWrap="wrap"
      gridGap="20px"
      justifyContent="center"
      maxWidth="100%"
      width="100%"
      {...group}
    >
      {buttons.map((button) => (
        <RadioButton
          key={uuid4()}
          selectedBackgroundColor={selectedBackgroundColor}
          text={button.text}
          {...getRadioProps({ value: button.value })}
        />
      ))}
    </Flex>
  );
};

export default RadioButtonGroup;

RadioButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      selected: PropTypes.bool,
      text: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  onChange: PropTypes.func,
  selectedBackgroundColor: PropTypes.string,
  selectedButton: PropTypes.shape({
    onClick: PropTypes.func,
    selected: PropTypes.bool,
    text: PropTypes.string,
    value: PropTypes.string,
  }),
};

RadioButtonGroup.defaultProps = {
  buttons: [],
  // eslint-disable-next-line no-console
  onChange: console.log,
  selectedBackgroundColor: theme.colors.green['400'],
  selectedButton: undefined,
};

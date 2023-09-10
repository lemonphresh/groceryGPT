import {
  NumberInput as ChakraNumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import theme from '../theme';

const NumberInput = ({ labelledBy, onChange, value, width }) => (
  <ChakraNumberInput
    aria-labelledby={labelledBy}
    defaultValue={value}
    min={1}
    max={20}
    onChange={onChange}
    size="lg"
    width={width}
  >
    <NumberInputField backgroundColor={theme.colors.orange[50]} />
    <NumberInputStepper>
      <NumberIncrementStepper backgroundColor={theme.colors.orange[100]} />
      <NumberDecrementStepper backgroundColor={theme.colors.orange[100]} />
    </NumberInputStepper>
  </ChakraNumberInput>
);

export default NumberInput;

NumberInput.propTypes = {
  labelledBy: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.number,
  width: PropTypes.string,
};

NumberInput.defaultProps = {
  labelledBy: undefined,
  // eslint-disable-next-line no-console
  onChange: () => console.log,
  value: 0,
  width: '72px',
};

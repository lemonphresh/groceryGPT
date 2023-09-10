import { Flex, FormLabel } from '@chakra-ui/react';
import React from 'react';
import { v4 as uuid4 } from 'uuid';
import PropTypes from 'prop-types';
import { NumberInput } from '../atoms';

const NumberInputWithLabel = ({ labelText, onChange, value }) => {
  const labelId = uuid4();
  return (
    <Flex alignItems="center">
      <FormLabel id={labelId}>{labelText}</FormLabel>
      <NumberInput labelledBy={labelId} onChange={onChange} value={value} />
    </Flex>
  );
};

export default NumberInputWithLabel;

NumberInputWithLabel.propTypes = {
  labelText: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.number,
};

NumberInputWithLabel.defaultProps = {
  labelText: 'Form label',
  onChange: () => {},
  value: 0,
};

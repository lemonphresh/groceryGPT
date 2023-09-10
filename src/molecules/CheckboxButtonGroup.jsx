import { Checkbox, CheckboxGroup, Flex } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid4 } from 'uuid';

const CheckboxButtonGroup = ({ buttons, onChange, selectedButtons }) => (
  <CheckboxGroup defaultValue={selectedButtons} onChange={onChange}>
    <Flex
      alignItems="center"
      flexWrap="wrap"
      gridColumnGap="20px"
      justifyContent="center"
      maxWidth="100%"
      width="100%"
    >
      {buttons.map((button) => (
        <Checkbox colorScheme="teal" key={uuid4()} value={button.value}>
          {button.text}
        </Checkbox>
      ))}
    </Flex>
  </CheckboxGroup>
);

export default CheckboxButtonGroup;

CheckboxButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      selected: PropTypes.bool,
      text: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  onChange: PropTypes.func,
  selectedButtons: PropTypes.arrayOf(
    PropTypes.shape({
      selected: PropTypes.bool,
      text: PropTypes.string,
      value: PropTypes.string,
    })
  ),
};

CheckboxButtonGroup.defaultProps = {
  buttons: [],
  // eslint-disable-next-line no-console
  onChange: console.log,
  selectedButtons: [],
};

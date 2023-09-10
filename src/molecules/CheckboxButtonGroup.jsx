import { Checkbox, CheckboxGroup, Flex } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid4 } from 'uuid';
import theme from '../theme';

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
        <Checkbox
          colorScheme="green"
          display="inline-flex"
          iconColor={theme.colors.green[500]}
          key={uuid4()}
          marginLeft="8px"
          value={button.value}
          width="125px"
          _focus={{
            outline: '1px blue solid',
          }}
          sx={{
            '> .chakra-checkbox__control[data-checked]': {
              backgroundColor: theme.colors.green[500],
              borderColor: theme.colors.green[500],
              borderRadius: '20px',
              boxShadow: '2px 1px 2px 0px rgba(0, 0, 0, 0.3)',
              fontWeight: 'bold',
            },
            '> .chakra-checkbox__control': {
              backgroundColor: theme.colors.orange[50],
              borderColor: theme.colors.gray[500],
              borderRadius: '20px',
            },
            '.chakra-checkbox__control[data-focus]': {
              outline: '2px solid blue',
            },
          }}
        >
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

/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Flex } from '@chakra-ui/react';
import theme from '../theme';
import useKeyboardInteractions from '../utils/useKeyboardInteractions';

const Chips = ({
  borderTop,
  chipHandler,
  clearAllBgColor,
  clearAllColor,
  onClickClearAll,
  paddingY,
}) => {
  const { performActionOnEnterOrSpace } = useKeyboardInteractions();
  const [chips, setChips] = useState([]);

  useEffect(() => {
    setChips([]);
    setChips(chipHandler());
  }, [chipHandler]);

  const clearAll = () => {
    setChips([]);
    onClickClearAll();
  };

  return (
    chips.length > 0 && (
      <Flex
        alignItems="center"
        borderTop={borderTop}
        css={`
          flex-flow: row wrap;
        `}
        paddingY={paddingY}
      >
        {chips}
        {chips.length > 1 && onClickClearAll && (
          <Button
            css={`
              border: none;
              background-color: ${clearAllBgColor};
              color: ${clearAllColor};
              cursor: pointer;
              display: inline-block;
              margin-top: 4px;
              padding: 0px;
              text-decoration: underline;
            `}
            data-component="ChipsClearAllButton"
            fontFamily={theme.fonts.openSans}
            onClick={clearAll}
            onKeyUp={(e) => performActionOnEnterOrSpace(e, clearAll)}
          >
            Clear All
          </Button>
        )}
      </Flex>
    )
  );
};

export default Chips;

Chips.propTypes = {
  borderTop: PropTypes.string,
  chipHandler: PropTypes.func,
  clearAllBgColor: PropTypes.string,
  clearAllColor: PropTypes.string,
  onClickClearAll: PropTypes.func,
  paddingY: PropTypes.string,
};

Chips.defaultProps = {
  borderTop: `1px solid ${theme.colors.neutral20}`,
  chipHandler: () => null,
  clearAllBgColor: theme.colors.white,
  clearAllColor: theme.colors.blue,
  onClickClearAll: undefined,
  paddingY: '8px',
};

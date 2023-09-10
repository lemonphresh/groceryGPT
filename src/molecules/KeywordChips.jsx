/* eslint-disable react/forbid-prop-types */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid4 } from 'uuid';
import Chips from './Chips';
import { InputChip } from '../atoms';
import theme from '../theme';

const formatChips = ({ keywords, onClickClose }) => {
  const chips = [];

  if (keywords?.length > 0) {
    keywords.forEach((keyword) => {
      chips.push(
        <InputChip
          backgroundColor={theme.colors.green['500']}
          key={uuid4()}
          onClick={() => onClickClose(keyword)}
          text={`"${keyword}"`}
          truncate={keyword.length > 25}
        />
      );
    });
  }

  return chips;
};

const KeywordChips = ({ keywords, onClickClearAll, onClickClose }) => {
  const chipHandler = useCallback(
    () =>
      formatChips({
        keywords,
        onClickClose,
      }),
    [keywords]
  );

  return <Chips borderTop="none" chipHandler={chipHandler} onClickClearAll={onClickClearAll} />;
};

export default KeywordChips;

KeywordChips.propTypes = {
  keywords: PropTypes.any,
  onClickClearAll: PropTypes.func,
  onClickClose: PropTypes.func,
};

KeywordChips.defaultProps = {
  keywords: {},
  onClickClearAll: undefined,
  onClickClose: () => null,
};

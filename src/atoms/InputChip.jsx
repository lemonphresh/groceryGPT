import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Text } from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import theme from '../theme';
import useKeyboardInteractions from '../utils/useKeyboardInteractions';

const InputChip = ({ backgroundColor, onClick, text, truncate }) => {
  const { performActionOnEnterOrSpace } = useKeyboardInteractions();

  return (
    <Flex
      alignItems="center"
      backgroundColor={backgroundColor}
      borderRadius={theme.lineHeights[4]}
      marginRight="8px"
      marginY="4px"
      maxWidth="100%"
      onClick={(e) => e.preventDefault()}
      paddingX="16px"
      paddingY="6px"
      transition="background-color .1s cubic-bezier(.15,0,.15,0)"
      width="fit-content"
      whiteSpace={['break-spaces', 'nowrap']}
    >
      <Text color="white" fontSize={theme.fontSizes.x14} lineHeight="default" marginRight="8px">
        {truncate ? `${text.slice(0, 24)}...` : text}
      </Text>
      <Flex
        alignItems="center"
        aria-label={`Remove filter: ${text}`}
        cursor="pointer"
        minWidth="16px"
        onClick={onClick}
        onKeyUp={(e) => performActionOnEnterOrSpace(e, onClick)}
        tabIndex={0}
      >
        <SmallCloseIcon color="white" />
      </Flex>
    </Flex>
  );
};

InputChip.propTypes = {
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  truncate: PropTypes.bool,
};

InputChip.defaultProps = {
  backgroundColor: theme.colors.black,
  onClick: null,
  text: null,
  truncate: false,
};

export default InputChip;

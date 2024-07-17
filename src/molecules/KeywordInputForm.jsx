import { Flex, Input, Text } from '@chakra-ui/react';
import { InfoIcon, PlusSquareIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import theme from '../theme';
import KeywordChips from './KeywordChips';

const KeywordInputForm = ({
  helperText,
  inputId,
  keywords,
  keywordType,
  onAddKeyword,
  onRemoveKeyword,
  placeholder,
}) => {
  const [isTextFocused, setIsTextFocused] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [addIconColor, setAddIconColor] = useState(theme.colors.gray[500]);

  const onAdd = () => {
    const keywordArr = textValue ? textValue.split(',') : [];
    // takes the array, trims each string, does not add words if the filter exists already,
    // removes any empty strings and turns the array into a set to remove duplicates just in case
    const noDupes = [
      ...new Set(
        keywordArr
          .map((i) => i.trim())
          .filter((keyword) => !keywords.includes(keyword) && keyword !== '')
      ),
    ];
    setTextValue('');
    setAddIconColor(theme.colors.gray[500]);
    onAddKeyword([...keywords, ...noDupes].sort());
  };

  const onTextChange = (e) => {
    setTextValue(e.target.value);
    setAddIconColor(e.target.value !== '' ? theme.colors.white : theme.colors.gray[500]);
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 13 || e.key === 'Enter') {
      onAdd();
    }
  };

  const onClearChip = (keyword) => {
    onRemoveKeyword(keyword);
  };

  return (
    <Flex flexDirection="column" minWidth="100%">
      <Flex
        alignItems="center"
        borderRadius="8px"
        justifyContent="space-between"
        padding={isTextFocused ? '7px' : '8px'}
      >
        <Input
          backgroundColor={theme.colors.orange[50]}
          id={inputId}
          maxLength={100}
          onBlur={() => {
            setIsTextFocused(false);
            if (!!textValue && textValue !== '') {
              setAddIconColor(theme.colors.white);
            } else {
              setAddIconColor(theme.colors.gray[500]);
            }
          }}
          onChange={(e) => onTextChange(e)}
          onFocus={() => {
            setIsTextFocused(true);
          }}
          onKeyUp={onKeyUp}
          placeholder={placeholder}
          size="lg"
          value={textValue}
        />

        <Flex
          alignItems="center"
          aira-label={`Add your ${keywordType} to the list.`}
          backgroundColor={
            addIconColor !== theme.colors.gray[500]
              ? theme.colors.light.turquoise.light
              : theme.colors.gray[200]
          }
          borderRadius="6px"
          boxShadow={
            addIconColor !== theme.colors.gray[500]
              ? '3px 2px 8px 0px rgba(0, 0, 0, 0.3)'
              : '2px 1px 2px 0px rgba(0, 0, 0, 0.1)'
          }
          css={`
            cursor: ${textValue ? 'pointer' : 'not-allowed'};
          `}
          justifyContent="center"
          marginLeft="8px"
          onClick={textValue ? onAdd : () => {}}
          padding="12px"
          tabIndex={textValue ? 0 : -1}
        >
          <PlusSquareIcon boxSize={6} color={addIconColor} />
        </Flex>
      </Flex>
      <Flex alignItems="center" marginX="16px">
        <InfoIcon
          alignSelf={['flex-start', undefined]}
          color={theme.colors.gray[500]}
          marginTop={['4px', undefined]}
          height="14px"
          width="14px"
        />
        <Text color={theme.colors.gray[600]} fontSize="14px" marginLeft="8px">
          {helperText}
        </Text>
      </Flex>

      <Flex maxWidth="500px" paddingX="8px">
        <KeywordChips keywords={keywords} onClickClose={onClearChip} />
      </Flex>
    </Flex>
  );
};

export default KeywordInputForm;

KeywordInputForm.propTypes = {
  helperText: PropTypes.string,
  inputId: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  keywordType: PropTypes.string,
  onAddKeyword: PropTypes.func,
  onRemoveKeyword: PropTypes.func,
  placeholder: PropTypes.string,
};

KeywordInputForm.defaultProps = {
  helperText: 'Use commas to separate your ingredients, or add them one by one.',
  inputId: 'keywordInput',
  keywords: [],
  keywordType: 'ingredient',
  onAddKeyword: () => {},
  onRemoveKeyword: () => {},
  placeholder: 'Ex: olive oil, salt, pepper...',
};

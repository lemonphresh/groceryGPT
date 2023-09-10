import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { CarrotSpinner } from '../atoms';
import { ResponseMarkdown } from '../molecules';
import theme from '../theme';

const MealPrepResponse = ({ error, loading, response }) => (
  <Flex
    backgroundColor={loading ? 'transparent' : '#ffffff8C'}
    boxShadow={!loading && '-3px 4px 8px 2px rgba(0, 0, 0, 0.2)'}
    display={!!error || !!loading || !!response ? 'flex' : 'none'}
    flexDirection="column"
    marginY="24px"
    maxWidth={['100%', '95vw', '1000px']}
    minHeight="90px"
    padding={['16px', '24px', '40px', '64px']}
    width="100%"
  >
    {!!error && <Text color={theme.colors.red['200']}>{error}</Text>}
    {loading === true && (
      <Flex alignSelf="center" gridGap="16px" justifySelf="center">
        <CarrotSpinner />
        <CarrotSpinner />
        <CarrotSpinner />
      </Flex>
    )}
    {loading === false && !!response && <ResponseMarkdown response={response} />}
  </Flex>
);

export default MealPrepResponse;

MealPrepResponse.defaultProps = {
  error: null,
  loading: false,
  response: null,
};

MealPrepResponse.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  response: PropTypes.string,
};

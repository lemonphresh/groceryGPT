import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import JsPDF from 'jspdf';
import { DownloadIcon } from '@chakra-ui/icons';
import { CarrotSpinner } from '../atoms';
import { ResponseMarkdown } from '../molecules';
import theme from '../theme';

const MealPrepResponse = ({ error, loading, response }) => {
  // mm-dd-YYYY format
  const todaysDate = new Date(Date.now()).toLocaleString().split(', ')[0].replaceAll('/', '-');
  const generatePDF = () => {
    const report = new JsPDF('portrait', 'pt', 'a4');
    report.html(document.querySelector('#meal-prep-response')).then(() => {
      report.save(`meal_plan-${todaysDate}.pdf`);
    });
  };

  return (
    <Flex
      backgroundColor={loading ? 'transparent' : '#ffffff8C'}
      boxShadow={!loading && '-3px 4px 8px 2px rgba(0, 0, 0, 0.2)'}
      display={!!error || !!loading || !!response ? 'flex' : 'none'}
      flexDirection="column"
      id="meal-prep-response"
      marginBottom="48px"
      marginTop="96px"
      maxWidth={['100%', '95vw', '85vw', '860px']}
      minHeight="90px"
      padding={['16px', '24px', '40px', '64px']}
      position="relative"
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
      {loading === false && !!response && (
        <>
          <button
            aria-label="Download your meal plan as a PDF."
            onClick={generatePDF}
            style={{
              backgroundColor: theme.colors.blue[300],
              borderRadius: '8px',
              boxShadow: '2px 1px 2px 0px rgba(0, 0, 0, 0.1)',
              padding: '4px',
              position: 'absolute',
              right: '24px',
              top: '24px',
            }}
            type="button"
          >
            <DownloadIcon color={theme.colors.white} height="36px" width="36px" />
          </button>
          <ResponseMarkdown response={response} />
        </>
      )}
    </Flex>
  );
};

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

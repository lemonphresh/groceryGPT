import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex } from '@chakra-ui/react';
import theme from '../theme';

const sizes = {
  small: '12px',
  med: theme.space.x16,
  large: '20px',
};

const Spinner = ({ color, size }) => {
  const diameterInPx = sizes[size];

  const [activeDot, setActiveDot] = useState(0);

  const dotStyles = {
    backgroundColor: `${color}80`,
    borderRadius: '50%',
    height: diameterInPx,
    width: diameterInPx,
    transform: 'scale(0.6)',
  };

  const activeDotStyles = {
    ...dotStyles,
    animation: 'pulse 0.4s',
    backgroundColor: color,
    '@keyframes pulse': {
      '0%': {
        transform: 'scale(0.6)',
      },
      '50%': {
        transform: 'scale(1)',
      },
      '100%': {
        transform: 'scale(0.6)',
      },
    },
  };

  const dots = [
    <Box {...(activeDot === 0 ? activeDotStyles : dotStyles)} key="dot1" />,
    <Box {...(activeDot === 1 ? activeDotStyles : dotStyles)} key="dot2" />,
    <Box {...(activeDot === 2 ? activeDotStyles : dotStyles)} key="dot3" />,
  ];

  let idx = 0;
  useEffect(() => {
    const interval = setInterval(() => {
      if (idx === dots.length - 1) {
        idx = 0;
      } else {
        idx += 1;
      }

      setActiveDot(idx);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <Flex alignItems="center" justifyContent="space-between" width={`calc(${diameterInPx} * 3)`}>
      {dots}
    </Flex>
  );
};

export default Spinner;

Spinner.defaultProps = {
  color: theme.colors.gray['700'],
  size: 'small',
};

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOf(['small', 'med', 'large']),
};

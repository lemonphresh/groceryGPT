import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import theme from '../theme';

const dB = {
  0: '36px',
  1: '32px',
  2: '27px',
};

const dL = {
  0: '38px',
  1: '25px',
  2: '10px',
};

const dT = {
  0: undefined,
  1: undefined,
  2: undefined,
};

const aB = {
  0: '30px',
  1: '25px',
  2: '20px',
};

const aL = {
  0: '38px',
  1: '25px',
  2: '10px',
};

const aT = {
  0: undefined,
  1: undefined,
  2: undefined,
};

const CarrotSpinner = () => {
  const [slice, setSlice] = useState(0);

  const carrot = [
    <Box
      id="trapez2"
      sx={{
        width: '0px',
        height: '30px',
        borderBottom: `5px solid transparent`,
        borderLeft: `15px solid ${theme.colors.orange[600]}`,
        borderTop: `5px solid transparent`,
        position: 'absolute',
        bottom: slice === 2 ? aB[2] : dB[2],
        left: slice === 2 ? aL[2] : dL[2],
        top: slice === 2 ? aT[2] : dT[2],
        transition: 'top 0.5s ease-in-out, bottom 0.5s ease-in-out, left 0.2s 0.5s ease-in-out',
      }}
    />,
    <Box
      id="trapez1"
      sx={{
        width: '0px',
        height: '20px',
        borderBottom: `5px solid transparent`,
        borderLeft: `15px solid ${theme.colors.orange[500]}`,
        borderTop: `5px solid transparent`,
        position: 'absolute',
        bottom: slice === 1 ? aB[1] : dB[1],
        left: slice === 1 ? aL[1] : dL[1],
        top: slice === 1 ? aT[1] : dT[1],
        transition: 'bottom 0.5s ease-in-out, left 0.2s 0.5s ease-in-out',
      }}
    />,
    <Box
      id="trapez0"
      sx={{
        width: '0px',
        height: '0px',
        borderBottom: `6px solid transparent`,
        borderLeft: `15px solid ${theme.colors.orange[400]}`,
        borderTop: `6px solid transparent`,
        position: 'absolute',
        bottom: slice === 0 ? aB[0] : dB[0],
        left: slice === 0 ? aL[0] : dL[0],
        top: slice === 0 ? aT[0] : dT[0],
        transition: 'bottom 0.5s ease-in-out, left 0.2s 0.5s ease-in-out',
      }}
    />,
  ];

  let idx = 0;
  useEffect(() => {
    const interval = setInterval(() => {
      if (idx === 0) {
        idx = carrot.length - 1;
      } else {
        idx -= 1;
      }
      setSlice(idx);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box height="80px" position="relative" width="72px">
      {carrot}
      <Box
        id="green"
        sx={{
          width: '0px',
          height: '0px',
          borderBottom: '10px solid transparent',
          borderLeft: `10px solid ${theme.colors.green[400]}`,
          borderTop: '10px solid transparent',
          position: 'absolute',
          bottom: slice === 2 ? `calc(${aB[2]} + 4px)` : `calc(${dB[2]} + 4px)`,
          left: '0px',
          top: slice === 2 ? `calc(${aT[2]} + 4px)` : `calc(${dT[2]} + 4px)`,
          transition: 'top 0.5s ease-in-out, bottom 0.5s ease-in-out, left 0.2s 0.5s ease-in-out',
        }}
      />
    </Box>
  );
};

export default CarrotSpinner;

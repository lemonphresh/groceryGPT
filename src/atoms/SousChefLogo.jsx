import { Flex, Image, useColorMode } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import SousChefPng from '../assets/souscheflogo.png';

const SousChefLogo = ({ stackOnMobile }) => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      alignItems="center"
      filter={colorMode === 'light' ? undefined : 'invert(1)'}
      flexDirection={stackOnMobile ? ['column', 'row'] : 'row'}
      justifyContent="center"
    >
      <Flex
        alignItems="center"
        height="40px"
        justifyContent="center"
        marginRight={stackOnMobile ? [0, '8px'] : '8px'}
        width="100%"
      >
        <Image
          alt="Sous Chef logo, black line art of a chef's hat"
          height={stackOnMobile ? ['40px', '24px'] : '24px'}
          src="https://cdn-icons-png.flaticon.com/512/4443/4443003.png"
          width={stackOnMobile ? ['40px', '24px'] : '24px'}
        />
      </Flex>
      <Image
        aria-hidden
        height={stackOnMobile ? ['48px', '32px'] : '32px'}
        marginTop="10px"
        src={SousChefPng}
      />
    </Flex>
  );
};

export default SousChefLogo;

SousChefLogo.propTypes = {
  stackOnMobile: PropTypes.bool,
};

SousChefLogo.defaultProps = {
  stackOnMobile: true,
};

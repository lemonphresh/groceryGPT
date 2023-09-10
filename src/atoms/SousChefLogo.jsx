import { Flex, Image, useColorMode } from '@chakra-ui/react';
import React from 'react';
import SousChefPng from '../assets/souscheflogo.png';

const SousChefLogo = () => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      alignItems="center"
      filter={colorMode === 'light' ? undefined : 'invert(1)'}
      flexDirection={['column', 'row']}
      justifyContent="center"
    >
      <Flex alignItems="center" height="40px" justifyContent="center" width="100%">
        <Image
          alt="Sous Chef logo, black line art of a chef's hat"
          height={['40px', '24px']}
          src="https://cdn-icons-png.flaticon.com/512/4443/4443003.png"
          width={['40px', '24px']}
        />
      </Flex>
      <Image aria-hidden height={['48px', '32px']} marginTop="10px" src={SousChefPng} />
    </Flex>
  );
};

export default SousChefLogo;

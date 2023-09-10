import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';
import React from 'react';
import SousChefLogo from '../atoms/SousChefLogo';
import theme from '../theme';
import Cashapp from '../assets/cashapp.png';
import LinkedInIcon from '../assets/linkedin.png';

const TopContent = () => (
  <Flex
    backgroundColor={theme.colors.white}
    alignItems="center"
    justifyContent="space-between"
    paddingX="32px"
    paddingY="16px"
  >
    <Link alignItems="center" display="flex" href="https://cash.app/$lemonlikesgirls/5.00">
      <Image aria-hidden height={['40px', '20px']} src={Cashapp} width={['40px', '20px']} />
      <Text display={['none', 'block']} marginLeft="8px">
        donate
      </Text>
    </Link>
    <SousChefLogo />
    <Link alignItems="center" display="flex" href="https://www.linkedin.com/in/lemongarrett/">
      <Text display={['none', 'block']} marginRight="8px">
        meet me
      </Text>
      <Box backgroundColor="black" borderRadius={['8px', '4px']} padding={['4px', '2px']}>
        <Image aria-hidden height={['36px', '18px']} src={LinkedInIcon} width={['36px', '18px']} />
      </Box>
    </Link>
  </Flex>
);

export default TopContent;

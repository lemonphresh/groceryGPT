import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';
import React from 'react';
import SousChefLogo from '../atoms/SousChefLogo';
import theme from '../theme';
import Cashapp from '../assets/cashapp.png';
import GitHub from '../assets/github.png';

const Footer = () => (
  <Flex
    backgroundColor={theme.colors.gray[200]}
    alignItems="center"
    justifyContent="space-between"
    paddingX="32px"
    paddingBottom="32px"
    paddingTop="64px"
    marginTop="64px"
  >
    <Link alignItems="center" display="flex" href="https://github.com/lemonphresh/groceryGPT">
      <Text display={['none', 'block']} marginRight="8px">
        see code
      </Text>
      <Box border="3px black solid" borderRadius={['8px', '4px']}>
        <Image aria-hidden height={['42px', '22px']} src={GitHub} width={['42px', '22px']} />
      </Box>
    </Link>
    <SousChefLogo stackOnMobile={false} />
    <Link alignItems="center" display="flex" href="https://cash.app/$lemonlikesgirls/5.00">
      <Image aria-hidden height={['44px', '28px']} src={Cashapp} width={['44px', '28px']} />
      <Text display={['none', 'block']} marginLeft="8px">
        donate
      </Text>
    </Link>
  </Flex>
);

export default Footer;

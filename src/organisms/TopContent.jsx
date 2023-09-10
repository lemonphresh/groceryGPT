import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';
import React from 'react';
import SousChefLogo from '../atoms/SousChefLogo';
import theme from '../theme';

const TopContent = () => (
  <Flex
    backgroundColor={theme.colors.white}
    alignItems="center"
    justifyContent="space-between"
    paddingX="32px"
    paddingY="16px"
  >
    <Link alignItems="center" display="flex" href="https://cash.app/$lemonlikesgirls/5.00">
      <Image
        aria-hidden
        height={['40px', '20px']}
        src="https://cdn.iconscout.com/icon/free/png-256/free-cashapp-3626898-3029306.png"
        width={['40px', '20px']}
      />
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
        <Image
          aria-hidden
          height={['36px', '18px']}
          src="https://www.freeiconspng.com/thumbs/linkedin-logo-png/displaying-19-gallery-images-for-linkedin-logo-png-25.png"
          width={['36px', '18px']}
        />
      </Box>
    </Link>
  </Flex>
);

export default TopContent;

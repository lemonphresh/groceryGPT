import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import config from './config';
import typography from './typography';

const theme = extendTheme({
  colors,
  config,
  ...typography,
});

export default theme;

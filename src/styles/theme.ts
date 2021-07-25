import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

const theme = extendTheme({
  config,
  colors: {
    white: '#F1f1f1',
    black: '#13131a',
    red: {
      500: '#e02041',
      600: '#be1b36'
    }
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter'
  }
})
export default theme

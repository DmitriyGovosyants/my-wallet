import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  colors: {
    bgMain: '#72bf6a',
    bgSecond: '#acd8a7',
    bgShadow: '#5bb450',
  },
  animation: {
      cubicBezier: '250ms cubic-bezier(0.7, 0.98, 0.86, 0.98)',
  }
});
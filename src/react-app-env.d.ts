/// <reference types="react-scripts" />

import '@emotion/react'
import { Theme as MuiTheme, ThemeOptions } from '@mui/material/styles';

declare module '@emotion/react' {
  interface Theme {
    colors: {
      bgMain: string;
      bgSecond: string;
      bgShadow: string;
    };
    animation: {
      cubicBezier: string;
    };
  };
  export interface Theme extends MuiTheme {};
}

declare module '@mui/material/styles' {
  interface CustomTheme extends MuiTheme {
    colors: {
      bgMain: string;
      bgSecond: string;
      bgShadow: string;
    };
    animation: {
      cubicBezier: string;
    };
  }
  interface CustomThemeOptions extends ThemeOptions {
    colors?: {
      bgMain?: string;
      bgSecond?: string;
      bgShadow?: string;
    };
    animation?: {
      cubicBezier?: string;
    };
  }
  export function createTheme(options?: CustomThemeOptions): CustomTheme;
}
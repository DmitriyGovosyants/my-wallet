/// <reference types="react-scripts" />

import '@emotion/react'
import { Theme as MuiTheme, ThemeOptions } from '@mui/material/styles';

declare module '@emotion/react' {
  export interface Theme {
    animation: {
      cubicBezier: string;
    };
  };
  export interface Theme extends MuiTheme { };
}

declare module '@mui/material/styles' {
  interface CustomTheme extends Theme {
    animation: {
      cubicBezier: string;
    };
  }
  interface CustomThemeOptions extends ThemeOptions {
    animation?: {
      cubicBezier?: string;
    };
  }
  export function createTheme(options?: CustomThemeOptions): CustomTheme;
}
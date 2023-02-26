import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'redux/store';
import { Global } from '@emotion/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'modern-normalize';

import App from './App';
import { GlobalStyles, theme } from 'styles';

import {
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
  createTheme,
} from '@mui/material/styles';

const muiTheme = createTheme({
  ...theme,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/">
          {/* <ThemeProvider theme={theme}> */}
            <Global styles={GlobalStyles} />
            <ToastContainer autoClose={2500} position={'bottom-right'} />
            <StyledEngineProvider injectFirst>
              <MuiThemeProvider theme={muiTheme}>
                <App />
              </MuiThemeProvider>
            </StyledEngineProvider>
          {/* </ThemeProvider> */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

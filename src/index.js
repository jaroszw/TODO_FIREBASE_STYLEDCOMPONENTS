import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from './utils/global';
import theme from './utils/theme';

import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <ThemeProvider theme={theme}>
      <>
        <App />
        <GlobalStyles />
      </>
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
);

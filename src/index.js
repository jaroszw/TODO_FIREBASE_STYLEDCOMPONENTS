import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from './utils/global';
import theme from './utils/theme';

import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { rrfProps } from './store/index';

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router>
        <ThemeProvider theme={theme}>
          <React.Fragment>
            <App />
            <GlobalStyles />
          </React.Fragment>
        </ThemeProvider>
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

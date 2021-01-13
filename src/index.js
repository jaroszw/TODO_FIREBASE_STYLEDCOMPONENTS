import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import styled from "styled-components";

import { ThemeProvider } from "styled-components";
import GlobalStyles from "./utils/global";
import theme from "./utils/theme";

import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store";

import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { rrfProps } from "./store/index";

// local storage imports
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import StyledLoader from "./components/UI/Loader/Loader";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// conditional loading app function
function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth))
    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <StyledLoader />
        </Wrapper>
        <GlobalStyles />
      </ThemeProvider>
    );
  return children;
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router>
        <ThemeProvider theme={theme}>
          <AuthIsLoaded>
            <App />
          </AuthIsLoaded>
          <GlobalStyles />
        </ThemeProvider>
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

import Box from "@material-ui/core/Box";
import React from "react";
import { render } from "react-dom";
import { Splash } from "./splash";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { reducer } from "./reducer";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { App } from "./app";

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <Box>
        <App />
      </Box>
    </Provider>
  );
};

render(
  <Root
    store={createStore(
      reducer,
      compose(
        applyMiddleware(
          thunk,
          ...(process.env.NODE_ENV === "DEVELOPMENT" ? [logger] : [])
        )
      )
    )}
  />,
  document.querySelector("#main")
);

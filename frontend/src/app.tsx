import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { Splash } from "./splash";
import { onUpdateCurrentUser } from "./action-creators";
import { onCheckRefreshToken } from "./api-action-creators";
import { Home } from "./home";

const AppComponent = ({
  currentUser,
  onUpdateCurrentUser,
  onCheckRefresh,
  loaded,
}) => {
  useEffect(() => {
    onCheckRefresh();
  }, []);

  if (!loaded) {
    return (
      <Box py={3} width={1} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <Box>
        {!currentUser && (
          <Splash
            currentUser={currentUser}
            onUpdateCurrentUser={onUpdateCurrentUser}
          />
        )}
        {currentUser && <Home currentUser={currentUser} />}
      </Box>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    loaded: state.loaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateCurrentUser: (currentUser) =>
      dispatch(onUpdateCurrentUser(currentUser)),
    onCheckRefresh: () => {
      dispatch(onCheckRefreshToken());
    },
  };
};

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

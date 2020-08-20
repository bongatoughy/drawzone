import React from "react";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import { Splash } from "./splash";
import { onUpdateCurrentUser } from "./action-creators";
import { Home } from "./home";

const AppComponent = ({ currentUser, onUpdateCurrentUser }) => {
  console.log({ currentUser });
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
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateCurrentUser: (currentUser) =>
      dispatch(onUpdateCurrentUser(currentUser)),
  };
};

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

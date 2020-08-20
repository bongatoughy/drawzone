import Box from "@material-ui/core/Box";
import React from "react";
import { render } from "react-dom";
import { Splash } from "./splash";

const Root = () => {
  return (
    <Box>
      <Splash />
    </Box>
  );
};

render(<Root />, document.querySelector("#main"));

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { render } from "react-dom";

const Root = () => {
  return (
    <Box>
      <Typography>drawzone</Typography>
    </Box>
  );
};

render(<Root />, document.querySelector("#main"));

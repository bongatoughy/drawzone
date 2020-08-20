import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";

export const Home = ({ currentUser }) => {
  return (
    <Slide in={!!currentUser} direction="down">
      <Box py={2} width={1} bgcolor="primary">
        <Typography variant="h3">drawzone</Typography>
      </Box>
    </Slide>
  );
};

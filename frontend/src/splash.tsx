import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { ROUTES } from "./routes";

export const Splash = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onToggleAuthSwitch = () => {
    setIsRegister(!isRegister);
  };

  const onChangeEmail = ({ currentTarget: { value } }) => {
    setEmail(value);
  };

  const onChangePassword = ({ currentTarget: { value } }) => {
    setPassword(value);
  };

  const onSubmit = () => {
    isRegister
      ? axios.post(ROUTES.REGISTER, { email, password })
      : axios.post(ROUTES.LOGIN, { email, password });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center" py={3}>
        <Typography variant="h3">drawzone</Typography>
      </Box>
      <Box display="flex" px={2} flexDirection="column" mt={2}>
        <Typography variant="h5" align="center">
          {isRegister ? "register" : "login"}
        </Typography>
        <Box display="flex" flexDirection="column" mt={2}>
          <TextField
            type="email"
            value={email}
            onChange={onChangeEmail}
            placeholder="email"
          />
        </Box>
        <Box display="flex" flexDirection="column" mt={2}>
          <TextField
            value={password}
            onChange={onChangePassword}
            type="password"
            placeholder="password"
          />
        </Box>
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onSubmit}
          >
            {isRegister ? "register" : "login"}
          </Button>
        </Box>
        <Box
          mt={2}
          display="flex"
          justifyContent="space-around"
          alignItems="center"
        >
          <Switch onClick={onToggleAuthSwitch} />
          <Typography>Click the switch to register</Typography>
        </Box>
      </Box>
    </Box>
  );
};

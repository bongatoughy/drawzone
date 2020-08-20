import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Slide from "@material-ui/core/Slide";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import React, { useState } from "react";

import { ROUTES } from "./routes";

export const Splash = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState(null);

  const onToggleAuthSwitch = () => {
    setIsRegister(!isRegister);
  };

  const onChangeEmail = ({ currentTarget: { value } }) => {
    setEmail(value);
  };

  const onChangePassword = ({ currentTarget: { value } }) => {
    setPassword(value);
  };

  const onSubmit = async () => {
    try {
      const authResponse = isRegister
        ? await axios.post(ROUTES.REGISTER, { email, password })
        : await axios.post(ROUTES.LOGIN, { email, password });
      setCurrentUser(authResponse.data);
      setAuthError(null);
    } catch (e) {
      setAuthError(e.message);
    }
  };

  return (
    <Slide
      timeout={{ enter: 0, exit: 1000 }}
      direction="up"
      mountOnEnter
      in={!currentUser}
    >
      <Box display="flex" justifyContent="center">
        <Box maxWidth={366} width={1}>
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
              <FormControl fullWidth error={!!authError}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={onSubmit}
                >
                  {isRegister ? "register" : "login"}
                </Button>
                {authError && (
                  <FormHelperText id="component-error-text">
                    {authError}
                  </FormHelperText>
                )}
              </FormControl>
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
      </Box>
    </Slide>
  );
};

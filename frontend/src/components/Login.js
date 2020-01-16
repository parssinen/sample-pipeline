import React, { useState } from "react";
import { setUser } from "../stateContext";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageState, setMessageState] = useState({
    open: false,
    vertical: "top",
    horizonal: "center",
    message: null,
    severity: null
  });

  const classes = useStyles();
  const { open, message, severity } = messageState;

  const handleClose = () => {
    setMessageState({ ...messageState, open: false });
  };

  const submitHandler = e => {
    e.preventDefault();
    fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ user: username, password: password })
    })
      .then(res => res.json())
      .then(json => {
        if (json.token) {
          localStorage.setItem("token", json.token);
          localStorage.setItem("user", JSON.stringify({ username }));
          setUser({ username });
        }
      })
      .catch(err => {
        console.error(err);
        setMessageState({
          open: true,
          severity: "error",
          message: "Wrong username and/or password 🤨"
        });
      });
  };

  return (
    <div>
      <div className={classes.root}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </div>
      <div className="main-title">Login</div>
      <div className="main-content">
        <form onSubmit={submitHandler} className="login-form">
          <input
            data="username-login"
            required
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            data="password-login"
            required
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className="button-wrapper">
            <button data="submit" variant="primary" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

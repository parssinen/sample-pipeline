import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";

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
  const [email, setEmail] = useState("");
  const [openState, setOpenState] = useState({
    open: false,
    vertical: "top",
    horizonal: "center",
    Transition: Slide
  });

  const classes = useStyles();
  const { open } = openState;

  const handleClose = () => {
    setOpenState({ ...openState, open: false });
  };

  const submitHandler = e => {
    e.preventDefault();
    fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ username, password, email })
    })
      .then(res => res.json())
      .then(json => {
        if (json.data.insert_users.returning) {
          // success
        } else {
          // something went wrong
          setOpenState({ open: true });
        }
      })
      .catch(err => {
        console.error(err);
        setOpenState({ open: true });
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
          <Alert onClose={handleClose} severity="error">
            Something went wrong
            <span role="img" aria-label="Sadface">
              🥺
            </span>
          </Alert>
        </Snackbar>
      </div>
      <div className="main-title">Register</div>
      <div className="main-content">
        <form onSubmit={submitHandler} className="register-form">
          <input
            data="username"
            required
            type="text"
            placeholder="Name"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            data="email"
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            data="password"
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className="button-wrapper">
            <button data="submit" variant="primary" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

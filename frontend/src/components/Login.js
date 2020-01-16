import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { setUser } from "../stateContext";
import Alert from "react-bootstrap/Alert";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

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
        setLoginError("Wrong username and/or password!");
      });
  };

  return (
    <div>
      <div class="main-title">
        Login
    </div>
      <div class="main-content">
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              data="username-login"
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              data="password-login"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>
          <Alert show={loginError} variant="danger">
            {loginError}
          </Alert>
          <Button data="submit" variant="primary" type="submit">
            Login
        </Button>
        </Form>
      </div>
    </div>
  );
}

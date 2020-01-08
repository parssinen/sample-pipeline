import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [registerError, setRegisterError] = useState(null);

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
        console.log("response", json);
        if (json.data.insert_users.returning) {
          // success
        } else {
          // something went wrong
          setRegisterError("Something went wrong");
        }
      })
      .catch(err => {
        console.error(err);
        setRegisterError("Something went wrong");
      });
  };

  return (
    <div>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            data="username"
            type="text"
            placeholder="Name"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            data="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            data="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Alert show={registerError} variant="danger">
          {registerError}
        </Alert>
        <Button data="submit" variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

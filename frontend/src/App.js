import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Login from "./components/Login";
import Register from "./components/Register";
import Users from './components/Users'
import Navbar from "react-bootstrap/Navbar";
import Home from "./components/Home";
import { Redirect } from "react-router-dom";
import { useGlobalState, setUser } from "./stateContext";

function App() {
  const [user] = useGlobalState("user");

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  }, []); // <- empty array ensures this useEffect is ran only once

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Router>
      <Container>
        <Row></Row>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Sample Pipeline</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Link data="home" to="/">
            Home
          </Link>
          {user ? (
            <Link data="logout" to="/" onClick={logout}>
              Log out
              <Redirect to="/" />
            </Link>
          ) : (
              <Link data="login" to="/login">
                Login
            </Link>
            )}
          <Link data="register" to="/register">
            Register
          </Link>
          {user ? <Link data="users" to="/users" >Users</Link> : null}
          {user ? <span>{user.username}</span> : null}
        </Navbar>

        <Row>
          <Switch>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Row>
      </Container>
    </Router>
  );
}

export default App;

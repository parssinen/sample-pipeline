import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "react-bootstrap/Navbar";
import Home from "./components/Home";
import { useGlobalState, setUser } from "./stateContext";

function App() {
  const [user] = useGlobalState("user");

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      setUser(userFromStorage);
    }
  });

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
          <Link to="/">Home</Link>
          {user ? (
            <Link to="/" onClick={logout}>
              Log out
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <Link to="/register">Register</Link>
        </Navbar>

        <Row>
          <Switch>
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

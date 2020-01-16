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
        <div class="navigation">
          <div class="nav-title">
            Sample Pipeline
          </div>
          <div class="nav-links">
            <Link data="home" to="/">
              <i class="fas fa-home"></i>
              Home
          </Link>
            {user ? (
              <Link data="logout" to="/" onClick={logout}>
                <i class="fas fa-power-off"></i>
                Log out
              <Redirect to="/" />
              </Link>
            ) : (
                <Link data="login" to="/login">
                  <i class="fas fa-sign-in-alt"></i>
                  Login
            </Link>
              )}
            <Link data="register" to="/register">
              <i class="fas fa-user"></i>
              Register
          </Link>
            {user ? <Link data="users" to="/users" >
              <i class="fas fa-users"></i>
              Users
              </Link> : null}
          </div>
        </div>
        <div class="main">
          <div class="main-subnav">
            <div class="main-subnav-spacer"></div>
            {user ? <div class="main-subnav-user">
              <span>{user.username}</span>
              <div class="main-subnav-user-icon">
                <i class="fas fa-user"></i>
              </div>
            </div> : null}
          </div>
          <Switch>

            <Route path="/users" title="Users">
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
        </div>
      </Container>
    </Router>
  );
}

export default App;

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
        <div className="navigation">
          <div className="nav-title">
            Sample Pipeline
          </div>
          <div className="nav-links">
            <Link data="home" to="/">
              <i className="fas fa-home"></i>
              Home
          </Link>
            <Link data="register" to="/register">
              <i className="fas fa-user"></i>
              Register
          </Link>
            {user ? <Link data="users" to="/users" >
              <i className="fas fa-users"></i>
              Users
              </Link> : null}
            {user ? (
              <Link data="logout" to="/" onClick={logout}>
                <i className="fas fa-power-off"></i>
                Log out
              <Redirect to="/" />
              </Link>
            ) : (
                <Link data="login" to="/login">
                  <i className="fas fa-sign-in-alt"></i>
                  Login
            </Link>
              )}
          </div>
        </div>
        <div className="main">
          <div className="main-subnav">
            <div className="main-subnav-spacer"></div>
            {user ? <div className="main-subnav-user">
              <span>{user.username}</span>
              <div className="main-subnav-user-icon">
                <i className="fas fa-user"></i>
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

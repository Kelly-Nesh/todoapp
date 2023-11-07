import { useState } from "react";
import { Link, Switch, Route } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Navbar";

import "./App.css";
import AddTodo from "./components/add-todo";
import Signup from "./components/signup";
import Login from "./components/login";
import TodosList from "./components/todos-list";
import TodoDataService from "./services/todos";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");
  // const [alertClasses, setAlertClasses] = useState("d-none");

  const login = async (user = null) => {
    TodoDataService.login(user)
      .then((response) => {
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", user.username);
        setError("");
      })
      .catch((e) => {
        console.log("login", e);
        // setAlertClasses("alert alert-danger");
        setError(e.toString());
      });
  };
  const logout = async () => {
    setUser(null);
    setToken(null);
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
  };
  const signup = async (user = null) => {
    TodoDataService.signup(user)
      .then((response) => {
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", user.username);
      })
      .catch((e) => {
        console.log("signup", e);
        // setAlertClasses("alert alert-danger");
        setError(e.toString());
      });
    setUser(user);
  };
  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <div className="container-fluid">
          <Navbar.Brand>Todos App</Navbar.Brand>
          <Nav className="me-auto">
            <Container>
              <Link className="nav-link" to={"/todos"}>
                Todos
              </Link>
              {user ? (
                <Link className="nav-link" onClick={logout} to={"/logout"}>
                  Logout ({user})
                </Link>
              ) : (
                <>
                  <Link className="nav-link" to={"/login"}>
                    Login
                  </Link>
                  <Link className="nav-link" to={"/signup"}>
                    Sign Up
                  </Link>
                </>
              )}
            </Container>
          </Nav>
        </div>
      </Navbar>
      {/* <div className={alertClasses} role="alert">
        {error}
      </div> */}
      <div className="container mt-4">
        <Switch>
          <Route
            exact
            path={["/", "/todos"]}
            render={(props) => <TodosList {...props} token={token} />}
          ></Route>
          <Route
            path="/todos/create"
            render={(props) => <AddTodo {...props} token={token} />}
          ></Route>
          <Route
            path="/todos/:id/"
            render={(props) => <AddTodo {...props} token={token} />}
          ></Route>
          <Route
            path="/login"
            render={(props) => <Login {...props} login={login} />}
          ></Route>
          <Route
            path="/signup"
            render={(props) => <Signup {...props} signup={signup} />}
          ></Route>
        </Switch>
      </div>

      <footer className="text-center text-lg-start bg-light text-muted mt-4">
        <div className="text-center p-4">
          &copy;Copyright-
          <a
            target="_blank"
            className="text-reset fw-bold text-decoration-none"
            href="https://twitter.com/greglim81"
          >
            Greg Lim
          </a>
          -
          <a
            target="_blank"
            className="text-reset fw-bold text-decoration-none"
            href="https://twitter.com/danielgarax"
          >
            Daniel Correa
          </a>
        </div>
      </footer>
    </div>
  );
};
export default App;

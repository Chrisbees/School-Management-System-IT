import "./App.css";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css"
import AddProject from "./components/Project/AddProject";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { Component } from "react";
import UpdateProject from "./components/Project/UpdateProject";
import Landing from "./components/Layout/Landing";
import Header from "./components/Layout/Header";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import jwt_decode from "jwt-decode";
import setJWTTOken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecuredRoute"

const jwtToken = localStorage.jwtToken;
if (jwtToken) {
  setJWTTOken(jwtToken)
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout())
    window.location.href = "/"
  }
}
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="register" element={<Register />} />
            <Route exact path="login" element={<Login />} />
            <Route element={<SecuredRoute />}>
              <Route exact path="dashboard" element={<Dashboard />} />
              <Route exact path="/addProject" element={<AddProject />} />
              <Route exact path="/updateProject/:id" element={<UpdateProject />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
  };


export default App;

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Dashboard, RegistrationModal } from "./components";
import axios from "axios";
const { REACT_APP_LOCAL_URL, REACT_APP_PRODUCTION_URL, REACT_APP_CLIENT_ID } =
  process.env;

var api_url;
if (process.env.NODE_ENV === "production") {
  api_url = REACT_APP_PRODUCTION_URL;
} else {
  api_url = REACT_APP_LOCAL_URL;
}
class App extends Component {
  state = {
    isAuthenticated: false, // TODO Check cookie for Authentication
    userFirstName: "John", // TODO Store state values in local storage for persistance
    userLastName: "Smith",
    userType: "manager", // Implemented Options: "guest", "customer", "manager", "employee"
    showModal: false,
    showModalLogin: false,
    showModalSignUp: false,
  };

  // TODO Simplify
  showModal = (tab) => {
    if (tab === "login") {
      this.setState({
        showModal: true,
        showModalLogin: true,
        showModalSignUp: false,
      });
    } else if (tab === "sign-up") {
      this.setState({
        showModal: true,
        showModalLogin: false,
        showModalSignUp: true,
      });
    }
  };

  handleAuthState = (res) => {
    const type = res.data.userType;
    this.setState({
      isAuthenticated: true,
      userFirstName: res.data.firstName,
      userLastName: res.data.lastName,
      showModal: false,
      userType: type.toLowerCase(),
    });
  };

  // TODO Move onLogout to functional component for redirect routing
  onLogout = () => {
    axios({
      method: "GET",
      url: api_url + "/users/logout",
      withCredentials: true,
    }).then((res) => {
      if (res.status === 200) {
        // TODO Redirect
        console.log("Logged Out");

        this.setState({
          isAuthenticated: false,
          userFirstName: "",
          userLastName: "",
          userType: "guest",
        });
      }
    });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isAuthenticated={this.state.isAuthenticated}
                userFirstName={this.state.userFirstName}
                userLastName={this.state.userLastName}
                userType={this.state.userType}
                onShowModal={this.showModal}
                onLogout={this.onLogout}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                isAuthenticated={this.state.isAuthenticated}
                userFirstName={this.state.userFirstName}
                userLastName={this.state.userLastName}
                userType={this.state.userType}
                onShowModal={this.showModal}
                onLogout={this.onLogout}
              />
            }
          />
        </Routes>
        {this.state.showModal && (
          <RegistrationModal
            isSignUpVisible={this.state.showModalSignUp}
            handleAuthState={this.handleAuthState}
            onShowModal={this.showModal}
            onHideModal={this.hideModal}
            showModalLogin={this.state.showModalLogin}
            showModalSignUp={this.state.showModalSignUp}
          ></RegistrationModal>
        )}
      </Router>
    );
  }
}

export default App;

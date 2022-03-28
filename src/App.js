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
  constructor() {
    super();

    let userData = this.getUser();

    console.log(
      " fname: " +
        userData.firstName +
        " lname: " +
        userData.lastName +
        " email: " +
        userData.email +
        " type: " +
        userData.userType
    );

    this.state = {
      isAuthenticated: localStorage.getItem("isAuthenticated") === "true", // TODO Check cookie for Authentication
      user: userData,
      userFirstName: userData.firstName,
      userLastName: userData.lastName,
      userEmail: userData.email, // TODO Get email from API
      userType: userData.userType,
      showModal: false,
      showModalLogin: false,
      showModalSignUp: false,
    };
  }

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
    // const type = res.data.userType;
    this.setState({
      isAuthenticated: true,
      userFirstName: res.data.firstName,
      userLastName: res.data.lastName,
      userType: res.data.type,
      showModal: false,
    });

    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("user", JSON.stringify(res.data));

    window.location.href = "/dashboard"; // Redirect to Dashboard
  };

  onLogout = () => {
    axios({
      method: "GET",
      url: api_url + "/users/logout",
      withCredentials: true,
    }).then((res) => {
      if (res.status === 200) {
        window.location.href = "/"; // Redirect to Home
        console.log("Logged Out");

        this.setState({
          isAuthenticated: false,
          userFirstName: "",
          userLastName: "",
          userType: "guest",
        });

        localStorage.clear();
      }
    });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  getUser = () => {
    let user = {
      firstName: "",
      lastName: "",
      email: "",
      userType: "Guest", // Implemented Options: "Guest", "Customer", "Manager", "Employee"
    };

    var storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      user = storedUser;
    }

    return user;
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
                userEmail={this.state.userEmail}
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

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Dashboard, RegistrationModal } from "./components";
import axios from "axios";
const { REACT_APP_LOCAL_URL, REACT_APP_PRODUCTION_URL, REACT_APP_CLIENT_ID } =
  process.env;

class App extends Component {
  state = {
    isAuthenticated: false,
    userFirstName: "John",
    userLastName: "Smith",
    userType: "Customer", // Implemented Options: "Customer", "Manager"
    showModal: false,
    showModalLogin: false,
    showModalSignUp: false,
  };

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

  onLogin = (event) => {
    var api_url;
    if (process.env.NODE_ENV === "production") {
      api_url = REACT_APP_PRODUCTION_URL;
      //console.log(api_url)
    } else {
      api_url = REACT_APP_LOCAL_URL;
      //console.log(api_url)
    }

    var loginData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    console.log(loginData);
    axios({
      method: "POST",
      url: api_url + "/users/login",
      data: { loginData },
    })
      .then((res) => {
        if (res.status === 200) {
          //Redirect to Dashboard
          console.log("Logged In Succesfully");
        }
      })
      .catch(function (err) {
        console.log(err);
        if (err.response) {
          if (err.response.status === 404) {
            console.log("EmailID not found");
            //Redirect to Dashboard
          }
        } else if (err.request) {
          //Response not received from API
          console.log("Error: ", err.request);
        } else {
          //Unexpected Error
          console.log("Error", err.message);
        }
      });
    event.preventDefault();
  };
  //this.setState({ isAuthenticated: true });

  onLogout = () => {
    this.setState({ isAuthenticated: false });
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
            onLogin={this.onLogin}
            onShowModal={this.showModal}
            onHideModal={this.hideModal}
            onGetModalVisibility={this.getModalVisibility}
            onGetModalTab={this.getModalTab}
            showModalLogin={this.state.showModalLogin}
            showModalSignUp={this.state.showModalSignUp}
          ></RegistrationModal>
        )}
      </Router>
    );
  }
}

export default App;

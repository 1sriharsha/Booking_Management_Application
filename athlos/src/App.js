import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Dashboard, RegistrationModal } from "./components";

class App extends Component {
  state = {
    isAuthenticated: true,
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
    var userLoginData = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    console.log(userLoginData);
    this.setState({ isAuthenticated: true });
  };

  onLogout = () => {
    this.setState({ isAuthenticated: false });
  };

  // TODO Hide Modal When Clicked Out Of
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

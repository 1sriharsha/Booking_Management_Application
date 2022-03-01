import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Dashboard, RegistrationModal } from "./components";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showModalLogin: false,
      showModalSignUp: false,
    };
  }

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

  // TODO Hide Modal When Clicked Out Of
  hideModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home onShowModal={this.showModal} />} />
          <Route
            path="/dashboard"
            element={<Dashboard onShowModal={this.showModal} />}
          />
        </Routes>
        {this.state.showModal && (
          <RegistrationModal
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

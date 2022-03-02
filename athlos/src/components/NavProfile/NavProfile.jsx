import React, { Component } from "react";
import styles from "./NavProfile.module.css";

class NavProfile extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    isAuthenticated: false,
  };

  render() {
    return (
      <React.Fragment>
        {/* Navigation: User Login/Sign Up Buttons [Right] */}
        {!this.state.isAuthenticated && (
          <div className={styles.login}>
            <button
              className={styles.button}
              onClick={() => this.props.onShowModal("login")}
            >
              Login
            </button>
            <button
              className={[styles.button, styles.buttonPrimary].join(" ")}
              onClick={() => this.props.onShowModal("sign-up")}
            >
              Sign Up
            </button>
          </div>
        )}
        {this.state.isAuthenticated && (
          <div className={[styles.login, styles.profile].join(" ")}>
            <div className={styles.profileName}>
              <span>John</span>
              <span>Smith</span>
            </div>
            <div className={styles.profileIcon}>
              <span>JS</span>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default NavProfile;

import React, { Component } from "react";
import styles from "./NavProfile.module.css";

class NavProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        {/* Navigation: User Login/Sign Up Buttons [Right] */}
        {!this.props.isAuthenticated && (
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
        {this.props.isAuthenticated && (
          <div className={[styles.login, styles.profile].join(" ")}>
            <div className={styles.profileName}>
              <span>{this.props.userFirstName}</span>
              <span>{this.props.userLastName}</span>
            </div>
            <div className={styles.profileIcon}>
              <span>
                {this.props.userFirstName.charAt(0) +
                  this.props.userLastName.charAt(0)}
              </span>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default NavProfile;

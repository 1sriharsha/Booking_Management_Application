import React, { Component } from "react";
import styles from "./GoogleLoginButton.module.css";
import "./GoogleLoginButton.css";

class GoogleLoginButton extends Component {
  render() {
    return (
      <button
        className={styles.button}
        onClick={() => console.log("Google Login Clicked")}
      >
        <img src="images/google-icon.svg" alt="Google Icon" />
        <span>Sign in with Google</span>
      </button>
    );
  }
}

export default GoogleLoginButton;

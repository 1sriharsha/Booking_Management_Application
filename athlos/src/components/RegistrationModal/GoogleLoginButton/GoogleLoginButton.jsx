import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
// import {refreshTokenSetup} from ""
import styles from "./GoogleLoginButton.module.css";
import "./GoogleLoginButton.css";

// TODO add client ID
const clientID = "YOUR_CLIENT_ID.apps.googleusercontent.com";

function GoogleLoginButton() {
  const onSuccess = (res) => {
    console.log("[Login Successful] currentUser:", res.profileObj);
    // refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log("[Login Failed] res:", res);
  };

  return (
    <GoogleLogin
      clientId={clientID}
      buttonText="Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single-host-origin"}
      isSignedIn={true}
    />
  );
}

export default GoogleLoginButton;

import React, { Component } from "react";
import styles from "./RegistrationModal.module.css";
import "./RegistrationModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleLoginButton } from "..";
import axios from "axios";
const { REACT_APP_LOCAL_URL, REACT_APP_PRODUCTION_URL, REACT_APP_CLIENT_ID } =
  process.env;
class RegistrationModal extends Component {
  state = {
    showPassword: false,
    passwordType: "password",
  };

  onSignUp = (event) => {
    var api_url;
    const clientID = REACT_APP_CLIENT_ID;
    if (process.env.NODE_ENV === "production") {
      //console.log(process.env.NODE_ENV)
      //console.log(REACT_APP_LOCAL_URL)
      //console.log(REACT_APP_PRODUCTION_URL)
      api_url = REACT_APP_PRODUCTION_URL;
      console.log(api_url);
    } else {
      //console.log(process.env.NODE_ENV)
      //console.log(REACT_APP_LOCAL_URL)
      api_url = REACT_APP_LOCAL_URL;
      console.log(api_url);
      //console.log(REACT_APP_PRODUCTION_URL)
    }
    var newUserData = {
      firstName: event.target.fname.value,
      lastName: event.target.lname.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };
    console.log(newUserData);

    //alert(api_url)
    axios({
      method: "POST",
      url: api_url + "/users/add",
      data: { newUserData },
    })
      .then((res) => {
        if (res.status === 200) {
          //Redirect to Dashboard
          console.log("User Added to Database");
        }
      })
      .catch(function (err) {
        console.log(err);
        if (err.response) {
          if (err.response.status === 409) {
            console.log("User Already Exists in Database");
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

  toggleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
      passwordType:
        this.state.passwordType === "password" ? "text" : "password",
    });
  };

  render() {
    return (
      <React.Fragment>
        {/* User Login/Sign Up Form */}
        <div className={styles.modal} id="user-form">
          <div className={styles.modalContent}>
            <div className={styles.modalContainer}>
              <div
                onClick={this.props.onHideModal}
                className={styles.close}
                title="Exit Form"
              >
                &times;
              </div>
              <div className={styles.tablinkContainer}>
                {/* User Form: Tab Links */}
                <button
                  className={[
                    styles.tablink,
                    this.props.showModalLogin ? "active" : "",
                  ].join(" ")}
                  id="login-link"
                  onClick={() => this.props.onShowModal("login")}
                >
                  Login
                </button>
                <button
                  className={[
                    styles.tablink,
                    this.props.showModalSignUp ? "active" : "",
                  ].join(" ")}
                  id="signup-link"
                  onClick={() => this.props.onShowModal("sign-up")}
                >
                  Sign Up
                </button>
              </div>
              {/* User Form: Login Form */}
              {this.props.showModalLogin ? (
                <React.Fragment>
                  <div className={styles.tab} id="login">
                    <div className={styles.thirdParty}>
                      {/* Google Sign-In Button */}
                      <GoogleLoginButton />
                    </div>
                    {/* Email Sign-In */}
                    <form
                      id="login-form"
                      className={styles.slideInRight}
                      onSubmit={this.props.onLogin}
                      method="post"
                    >
                      <div className={styles.inputContainer}>
                        <label htmlFor="email">Email</label>
                        <input
                          id="login-form-email"
                          type="text"
                          placeholder=""
                          name="email"
                        />
                      </div>

                      <div className={styles.inputContainer}>
                        <label htmlFor="password">Password</label>
                        <div className={styles.passwordContainer}>
                          <input
                            id="login-form-password"
                            type={this.state.passwordType}
                            placeholder=""
                            name="password"
                          />
                          <button
                            onClick={this.toggleShowPassword}
                            type="button"
                            className={styles.showPassword}
                          >
                            {!this.state.showPassword && (
                              <FontAwesomeIcon icon="fa-solid fa-eye" />
                            )}
                            {this.state.showPassword && (
                              <FontAwesomeIcon icon="fa-solid fa-eye-slash" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* <label>
                  <input type="checkbox" checked="checked" name="remember">
                  Remember Me
                </label> */}

                      <button
                        type="submit"
                        className={[
                          styles.button,
                          styles.buttonPrimary,
                          styles.buttonSubmit,
                        ].join(" ")}
                      >
                        Login
                      </button>
                    </form>
                  </div>
                </React.Fragment>
              ) : null}
              {/* User Form: Sign Up Form */}
              {this.props.showModalSignUp ? (
                <div className={styles.tab} id="sign-up">
                  <div className={styles.thirdParty}>
                    {/* Google Sign-In Button */}
                    <GoogleLoginButton />
                  </div>
                  {/* Email Sign Up */}
                  <form
                    id="signup-form"
                    className={styles.slideInLeft}
                    onSubmit={this.onSignUp}
                    method="post"
                  >
                    <div className={styles.nameContainer}>
                      <div
                        className={[styles.name, styles.inputContainer].join(
                          " "
                        )}
                      >
                        <label htmlFor="fname">First Name</label>
                        <input
                          id="signup-form-fname"
                          type="text"
                          placeholder=""
                          name="fname"
                        />

                        <div className={styles.error}></div>
                      </div>

                      <div
                        className={[styles.name, styles.inputContainer].join(
                          " "
                        )}
                      >
                        <label htmlFor="lname">Last Name</label>
                        <input
                          id="signup-form-lname"
                          type="text"
                          placeholder=""
                          name="lname"
                        />

                        <div className={styles.error}></div>
                      </div>
                    </div>

                    <div className={styles.inputContainer}>
                      <label htmlFor="email">Email</label>
                      <input
                        id="signup-form-email"
                        type="text"
                        placeholder=""
                        name="email"
                      />

                      <div className={styles.error}></div>
                    </div>

                    <div className={styles.inputContainer}>
                      <label htmlFor="password">Password</label>
                      <div className={styles.passwordContainer}>
                        <input
                          id="signup-form-password"
                          type={this.state.passwordType}
                          placeholder=""
                          name="password"
                        />
                        <button
                          onClick={this.toggleShowPassword}
                          type="button"
                          className={styles.showPassword}
                        >
                          {!this.state.showPassword && (
                            <FontAwesomeIcon icon="fa-solid fa-eye" />
                          )}
                          {this.state.showPassword && (
                            <FontAwesomeIcon icon="fa-solid fa-eye-slash" />
                          )}
                        </button>
                        <div className={styles.error}></div>
                      </div>
                    </div>

                    <div className={styles.inputContainer}>
                      <label htmlFor="password-repeat">Repeat Password</label>
                      <div className={styles.passwordContainer}>
                        <input
                          id="signup-form-password-repeat"
                          type={this.state.passwordType}
                          placeholder=""
                          name="password-repeat"
                        />
                        <button
                          onClick={this.toggleShowPassword}
                          type="button"
                          className={styles.showPassword}
                        >
                          {!this.state.showPassword && (
                            <FontAwesomeIcon icon="fa-solid fa-eye" />
                          )}
                          {this.state.showPassword && (
                            <FontAwesomeIcon icon="fa-solid fa-eye-slash" />
                          )}
                        </button>
                        <div className={styles.error}></div>
                      </div>
                    </div>

                    {/* <label>
                <input type="checkbox" checked="checked" name="remember">
                Remember Me
              </label> */}

                    <button
                      type="submit"
                      className={[
                        styles.button,
                        styles.buttonPrimary,
                        styles.buttonSubmit,
                      ].join(" ")}
                    >
                      Sign Up
                    </button>
                  </form>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RegistrationModal;

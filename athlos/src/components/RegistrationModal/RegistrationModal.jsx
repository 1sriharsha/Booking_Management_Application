import React, { Component } from "react";
import styles from "./RegistrationModal.module.css";
import "./RegistrationModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class RegistrationModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
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
                      <div
                        class="styles.g-signin2"
                        data-onsuccess="onSignIn"
                      ></div>
                    </div>
                    {/* Email Sign-In */}
                    <form id="login-form" className={styles.slideInRight}>
                      <div className={styles.inputContainer}>
                        <label for="username">Email</label>
                        <input
                          id="login-form-username"
                          type="text"
                          placeholder=""
                          name="username"
                        />
                      </div>

                      <div className={styles.inputContainer}>
                        <label for="password">Password</label>
                        <div className={styles.passwordContainer}>
                          <input
                            id="login-form-password"
                            type="password"
                            placeholder=""
                            name="password"
                          />
                          <button
                            onclick="toggleShowPassword(event)"
                            type="button"
                            className={styles.showPassword}
                          >
                            <i className="styles.fa-regular fa-eye"></i>
                          </button>
                        </div>
                      </div>

                      {/* <label>
                  <input type="checkbox" checked="checked" name="remember">
                  Remember Me
                </label> */}

                      <button
                        onclick="onLogin()"
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
                    <div
                      class="styles.g-signin2"
                      data-onsuccess="onSignIn"
                    ></div>
                  </div>
                  {/* Email Sign Up */}
                  <form id="signup-form" className={styles.slideInLeft}>
                    <div className={styles.nameContainer}>
                      <div
                        className={[styles.name, styles.inputContainer].join(
                          " "
                        )}
                      >
                        <label for="fname">First Name</label>
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
                        <label for="lname">Last Name</label>
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
                      <label for="email">Email</label>
                      <input
                        id="signup-form-email"
                        type="text"
                        placeholder=""
                        name="email"
                      />

                      <div className={styles.error}></div>
                    </div>

                    <div className={styles.inputContainer}>
                      <label for="password">Password</label>
                      <div className={styles.passwordContainer}>
                        <input
                          id="signup-form-password"
                          type="password"
                          placeholder=""
                          name="password"
                        />
                        <button
                          onclick="toggleShowPassword(event)"
                          type="button"
                          className={styles.showPassword}
                        >
                          <i className="fa-regular fa-eye"></i>
                        </button>
                        <div className={styles.error}></div>
                      </div>
                    </div>

                    <div className={styles.inputContainer}>
                      <label for="password-repeat">Repeat Password</label>
                      <div className={styles.passwordContainer}>
                        <input
                          id="signup-form-password-repeat"
                          type="password"
                          placeholder=""
                          name="password-repeat"
                        />
                        <button
                          onclick="toggleShowPassword(event)"
                          type="button"
                          className={styles.showPassword}
                        >
                          <i className="styles.fa-regular fa-eye"></i>
                        </button>
                        <div className={styles.error}></div>
                      </div>
                    </div>

                    {/* <label>
                <input type="checkbox" checked="checked" name="remember">
                Remember Me
              </label> */}

                    <button
                      onclick="onSignUp()"
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
      </>
    );
  }
}

export default RegistrationModal;

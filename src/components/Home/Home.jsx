import React, { Component } from "react";
import styles from "./Home.module.css";
import "./Home.css";
import { NavProfile } from "..";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShadowVisible: false,
    };
  }

  componentDidMount() {
    document.body.style.backgroundColor = "white";
    window.addEventListener("scroll", this.scrollAnimation);
  }

  scrollAnimation = () => {
    let scrollPosition = window.scrollY;

    if (scrollPosition >= 50) {
      this.setState((prevState) => ({ isShadowVisible: true }));
    } else {
      this.setState((prevState) => ({ isShadowVisible: false }));
    }
  };

  render() {
    return (
      <>
        {/* Top Navigation Bar */}
        <header
          className={[
            styles.topnav,
            this.state.isShadowVisible ? "topnavOverlay" : "",
          ].join(" ")}
        >
          <div className={styles.container}>
            <div className={styles.navigation}>
              {/* Navigation: Athlos Branding [Left] */}
              <div className={styles.logo}>
                <a href="/">Athlos</a>
              </div>

              {/* Navigation: Nav Links [Middle] */}
              <div className={styles.menu}>
                <ul className={styles.menuItem}>
                  <li>
                    <a href="/dashboard">Dashboard</a>
                  </li>
                  <li>
                    <a href="/">Support</a>
                  </li>
                  <li>
                    <a href="/">Account</a>
                  </li>
                </ul>
              </div>

              {/* Navigation: User Login/Sign Up Buttons [Right] */}
              <NavProfile
                isAuthenticated={this.props.isAuthenticated}
                userFirstName={this.props.userFirstName}
                userLastName={this.props.userLastName}
                userType={this.props.userType}
                onShowModal={this.props.onShowModal}
                onLogout={this.props.onLogout}
              />
            </div>
          </div>
        </header>

        {/* Introduction Section */}
        <div className={[styles.intro, styles.container].join(" ")}>
          {/* Introduction: Text [Left] */}
          <div className={styles.text}>
            <div className={styles.title}>The #1 Sports Booking Platform</div>
            <div className={[styles.description, styles.fadeIn].join(" ")}>
              Athlos is the easiest way to reserve sports <br />
              facilities on campus.
            </div>
            {!this.props.isAuthenticated && (
              <button
                className={[styles.button, styles.buttonPrimary].join(" ")}
                onClick={() => this.props.onShowModal("sign-up")}
              >
                Sign Up Free
              </button>
            )}
          </div>

          {/* Introduction: Image [Right] */}
          <div className={styles.image}>
            <img src="images/runner.jpeg" alt="" />
          </div>
        </div>
      </>
    );
  }
}

export default Home;

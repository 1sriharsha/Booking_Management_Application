import React, { Component } from "react";
import { SupportedSports } from "../../../../../data";
import styles from "./InterestModal.module.css";
import axios from "axios";

const { REACT_APP_LOCAL_URL, REACT_APP_PRODUCTION_URL } = process.env;

class InterestModal extends Component {
  state = { selectedInterests: [] };

  toggleInterest(e) {
    let selectedInterests = this.state.selectedInterests;
    let targetName = e.target.name;
    let targetChecked = e.target.checked;

    if (targetChecked) {
      selectedInterests.push(targetName);
    } else {
      selectedInterests.splice(targetName);
    }
    this.setState({ selectedInterests });
  }

  getInterests() {
    var api_url;
    if (process.env.NODE_ENV === "production") {
      api_url = REACT_APP_PRODUCTION_URL;
    } else {
      api_url = REACT_APP_LOCAL_URL;
    }

    axios({
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": api_url,
      },
      withCredentials: true,
      url: api_url + "/interests/userinterests",
      data: {
        email: this.props.userEmail,
      },
    })
      .then((res) => {
        var interest;

        if (res.status === 200 || res.status === 304) {
          interest = res.data[0].interest;
        }
        this.setState((prevState) => ({
          selectedInterests: interest,
        }));
      })
      .catch(function (err) {
        console.log(err);
        if (err.response) {
          if (err.response.status === 404) {
            console.log("Couldn't retrieve interests");
          }
        } else if (err.request) {
          //Response not received from API
          console.log("Error: ", err.request);
        } else {
          //Unexpected Error
          console.log("Error", err.message);
        }
      });
  }

  onSubmit = () => {
    var api_url;
    if (process.env.NODE_ENV === "production") {
      api_url = REACT_APP_PRODUCTION_URL;
    } else {
      api_url = REACT_APP_LOCAL_URL;
    }

    axios({
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": api_url,
      },
      withCredentials: true,
      url: api_url + "/interests/add",
      data: {
        email: this.props.userEmail,
        interest: this.state.selectedInterests,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("Interests Added Sucessfully");
        }
      })
      .catch(function (err) {
        console.log(err);
        if (err.response) {
          if (err.response.status === 404) {
            console.log("Couldn't add Interests");
          }
        } else if (err.request) {
          //Response not received from API
          console.log("Error: ", err.request);
        } else {
          //Unexpected Error
          console.log("Error", err.message);
        }
      });

    this.props.onCloseModal();
  };

  componentDidMount() {
    this.getInterests();
  }

  render() {
    const nInterests = SupportedSports.map(({ sportName }) => {
      return (
        <React.Fragment>
          <section className={styles.interestBox}>
            <input
              className={styles.checkbox}
              type={"checkbox"}
              value={sportName}
              onClick={(e) => this.toggleInterest(e)}
              name={sportName}
              defaultChecked={this.state.selectedInterests.includes(sportName)}
            />
            <label className={styles.sportName} htmlFor={sportName}>
              {sportName}
            </label>
          </section>
        </React.Fragment>
      );
    });

    return (
      <React.Fragment>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button
              className={styles.close}
              onClick={this.props.onCloseModal}
              title="Close"
            >
              &times;
            </button>

            <div className={styles.interestContainer}>
              <section className={styles.title}>Select Your Interests</section>
              <section className={styles.interests}>{nInterests}</section>

              <section>
                <button
                  onClick={() => this.onSubmit()}
                  className={[styles.button, styles.buttonPrimary].join(" ")}
                >
                  Submit
                </button>
              </section>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default InterestModal;

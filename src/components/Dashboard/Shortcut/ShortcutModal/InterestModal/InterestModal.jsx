import React, { Component } from "react";
import { SupportedSports } from "../../../../../data";
import styles from "./InterestModal.module.css";

class InterestModal extends Component {
  state = {};
  render() {
    const nInterests = SupportedSports.map(({ sportName }) => {
      return (
        <React.Fragment>
          <section className={styles.interestBox}>
            <input
              className={styles.checkbox}
              type={"checkbox"}
              value={sportName}
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
                  onClick={this.props.onCloseModal}
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

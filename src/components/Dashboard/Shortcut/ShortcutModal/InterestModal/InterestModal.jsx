import React, { Component } from "react";
import styles from "./InterestModal.module.css";

class InterestModal extends Component {
  state = {};
  render() {
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default InterestModal;

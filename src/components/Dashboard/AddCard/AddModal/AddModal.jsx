import React, { Component } from "react";
import InputMask from "react-input-mask";
import styles from "./AddModal.module.css";
import "./AddModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NumberFormat from "react-number-format";

class AddModal extends Component {
  render() {
    const {
      props: {},
    } = this;

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

export default AddModal;

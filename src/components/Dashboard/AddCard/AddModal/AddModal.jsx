import React, { Component } from "react";
import styles from "./AddModal.module.css";
import "./AddModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddFacility from "./AddFacility/AddFacility";

class AddModal extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            {this.props.type === "facility" && (
              <AddFacility onCloseModal={this.props.onCloseModal} />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddModal;

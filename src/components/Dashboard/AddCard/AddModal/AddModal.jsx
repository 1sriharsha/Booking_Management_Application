import React, { Component } from "react";
import styles from "./AddModal.module.css";
import "./AddModal.css";
import AddFacility from "./AddFacility/AddFacility";
import AddPromotion from "./AddPromotion/AddPromotion";
import uniqid from "uniqid";

class AddModal extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            {this.props.type === "facility" && (
              <AddFacility
                key={uniqid("", "-addfacility")}
                onCloseModal={this.props.onCloseModal}
              />
            )}
            {this.props.type === "promotion" && (
              <AddPromotion
                key={uniqid("", "-addpromotion")}
                onCloseModal={this.props.onCloseModal}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddModal;

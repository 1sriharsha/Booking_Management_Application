import React, { Component } from "react";
import styles from "./AddCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddModal from "./AddModal/AddModal";

class AddCard extends Component {
  state = {
    showAddModal: false,
  };

  onClickAdd = () => {
    document.querySelector("body").style.overflow = "hidden";
    this.setState({ showAddModal: true });
  };

  closeAddModal = () => {
    document.querySelector("body").style.overflow = "auto";
    this.setState({ showAddModal: false });
  };

  render() {
    const {
      props: {
        facilityID,
        facilityName,
        facilityLocation,
        facilitySport,
        facilityInfo,
        availableNow,
        animationDelay,
        reservationPeriodStart,
        reservationPeriodEnd,
        isAuthenticated,
      },
    } = this;

    let fadeDelay = { animationDelay: animationDelay + "s" };

    return (
      <React.Fragment>
        {/* Add Facility Card */}
        <button
          className={[styles.card, styles.loadIn].join(" ")}
          onClick={this.onClickAdd}
          style={fadeDelay}
          title="Add Facility"
        >
          <i>
            <FontAwesomeIcon icon="fa-solid fa-plus" />
          </i>
        </button>

        {/* Add Modal */}
        {this.state.showAddModal && (
          <AddModal onCloseModal={this.closeAddModal} />
        )}
      </React.Fragment>
    );
  }
}

export default AddCard;

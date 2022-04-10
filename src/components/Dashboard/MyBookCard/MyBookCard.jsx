import React, { Component } from "react";
import styles from "./MyBookCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal";

class MyBookCard extends Component {
  state = {
    isDeleted: false,
    showModal: false,
  };

  onDelete = () => {
    // TODO Delete from Database
    this.setState({ isDeleted: true });
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      props: {
        facilityID,
        facilityName,
        facilityLocation,
        facilitySport,
        facilityInfo,
        animationDelay,
      },
    } = this;

    let facilityLabel = facilityName;
    const maxLabelLength = 35;
    if (facilityLabel.length > maxLabelLength) {
      facilityLabel = facilityLabel.substring(0, maxLabelLength) + "...";
    }

    let sportImage =
      "images/" +
      facilitySport.toString().toLowerCase().replace(/ /g, "") +
      ".jpg";
    let fadeDelay = { animationDelay: animationDelay + "s" };

    return (
      <React.Fragment>
        {/* My Bookings Card */}
        {!this.state.isDeleted && (
          <div
            className={[styles.card, styles.loadIn].join(" ")}
            style={fadeDelay}
          >
            <div className={styles.image}>
              <img src={sportImage} alt={facilitySport} />
            </div>
            <div className={styles.content}>
              <div title={facilityName} className={styles.title}>
                {facilityLabel}
              </div>
              <div className={styles.location}>
                <i>
                  <FontAwesomeIcon icon="fa-solid fa-location-arrow" />
                </i>
                {facilityLocation}
              </div>
              <div className={styles.description}>
                <i>
                  <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                </i>
                {facilityInfo}
              </div>

              {/* Cancel Button */}
              <button
                className={[styles.button, styles.cancelButton].join(" ")}
                onClick={this.onDelete}
              >
                Cancel
              </button>

              {/* View Button */}
              <button
                className={[styles.button, styles.buttonPrimary].join(" ")}
                onClick={() => this.setState({ showModal: true })}
              >
                View
              </button>
            </div>
          </div>
        )}
        {this.state.showModal && (
          <ConfirmationModal
            confirmationCode={"261B7FCF0"}
            onCloseModal={this.onCloseModal}
            facilityName={facilityName}
            facilityLocation={facilityLocation}
            facilitySport={facilitySport}
            facilityInfo={facilityInfo}
          />
        )}
      </React.Fragment>
    );
  }
}

export default MyBookCard;

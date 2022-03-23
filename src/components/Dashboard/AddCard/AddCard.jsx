import React, { Component } from "react";
import styles from "./AddCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AddCard extends Component {
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
        {/* Facility Card */}
        <button
          className={[styles.card, styles.loadIn].join(" ")}
          style={fadeDelay}
          title="Add Facility"
        >
          <i>
            <FontAwesomeIcon icon="fa-solid fa-plus" />
          </i>
        </button>
      </React.Fragment>
    );
  }
}

export default AddCard;

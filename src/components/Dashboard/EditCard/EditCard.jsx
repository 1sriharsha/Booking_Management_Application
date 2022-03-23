import React, { Component } from "react";
import styles from "./EditCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class EditCard extends Component {
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
        <div
          className={[styles.card, styles.loadIn].join(" ")}
          style={fadeDelay}
        >
          <div className={styles.image}>
            {availableNow && (
              <div className={[styles.available, styles.fadeIn].join(" ")}>
                Available Now
              </div>
            )}
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
            <button
              className={[styles.button, styles.buttonPrimary].join(" ")}
              onClick={() => this.onClickBook({ facilityID })}
            >
              Book
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EditCard;
import React, { Component } from "react";
import styles from "./MyBookCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MyBookCard extends Component {
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
            <button
              className={[styles.button, styles.buttonPrimary].join(" ")}
              onClick={() => console.log("Cancel Booking")}
            >
              Cancel
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MyBookCard;

import React, { Component } from "react";
import styles from "./BookCard.module.css";
import "./BookCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class BookCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      props: {
        facilityName,
        facilityLocation,
        facilitySport,
        availableNow,
        animationDelay,
      },
    } = this;

    let facilityLabel = facilityName;
    const maxLabelLength = 35;
    if (facilityLabel.length > maxLabelLength) {
      facilityLabel = facilityLabel.substring(0, maxLabelLength) + "...";
    }

    let sportImage = "images/" + facilitySport + ".jpg";
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
            <button className={[styles.button, styles.buttonPrimary].join(" ")}>
              Book
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BookCard;

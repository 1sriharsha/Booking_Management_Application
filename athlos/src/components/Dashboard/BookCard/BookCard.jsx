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
      props: { facilityName, facilityLocation, facilitySport },
    } = this;

    let facilityLabel = facilityName;
    if (facilityLabel.length > 21) {
      facilityLabel = facilityLabel.substring(0, 22) + "...";
    }

    let sportImage = "images/tmp/" + facilitySport + ".jpg";
    // if (facilitySport.toLowerCase() === "soccer") {
    //   sportImage = "soccer";
    // }
    return (
      <React.Fragment>
        <div className={styles.card}>
          <div className={styles.image}>
            <img src={sportImage} alt="Soccer Field" />
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

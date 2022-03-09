import React, { Component } from "react";
import styles from "./BookCard.module.css";
import "./BookCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CheckoutModal } from "../..";

class BookCard extends Component {
  state = {
    showCheckoutModal: false,
  };

  onClickBook = () => {
    document.querySelector("body").style.overflow = "hidden";
    this.setState({ showCheckoutModal: true });
  };

  closeCheckoutModal = () => {
    document.querySelector("body").style.overflow = "auto";
    this.setState({ showCheckoutModal: false });
  };

  render() {
    const {
      props: {
        facilityID,
        facilityName,
        facilityLocation,
        facilitySport,
        availableNow,
        animationDelay,
        reservationPeriodStart,
        reservationPeriodEnd,
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
            <button
              className={[styles.button, styles.buttonPrimary].join(" ")}
              onClick={() => this.onClickBook({ facilityID })}
            >
              Book
            </button>
          </div>
        </div>

        {this.state.showCheckoutModal && (
          <CheckoutModal
            facilityID={facilityID}
            facilityName={facilityName}
            facilityLocation={facilityLocation}
            facilitySport={facilitySport}
            availableNow={availableNow}
            onCloseModal={this.closeCheckoutModal}
            reservationPeriodStart={reservationPeriodStart}
            reservationPeriodEnd={reservationPeriodEnd}
          />
        )}
      </React.Fragment>
    );
  }
}

export default BookCard;
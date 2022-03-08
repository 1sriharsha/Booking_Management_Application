import React, { Component } from "react";
import styles from "./CheckoutModal.module.css";
import "./CheckoutModal.css";
import TimeSlot from "./TimeSlot/TimeSlot";

class CheckoutModal extends Component {
  state = {
    sectionNumber: 1,
    timeSlot: "",
  };

  setPageNumber(page) {
    this.setState({ sectionNumber: page });
  }

  render() {
    const {
      props: {
        facilityID,
        facilityName,
        facilityLocation,
        facilitySport,
        reservationPeriodStart,
        reservationPeriodEnd,
      },
    } = this;

    let sportImage = "images/" + facilitySport + ".jpg";

    var nTimeSlots = [];
    var reservationSlotStart = reservationPeriodStart;
    var reservationSlotEnd;

    for (
      let index = 0;
      index < reservationPeriodEnd - reservationPeriodStart;
      index++
    ) {
      reservationSlotEnd = reservationSlotStart + 1;

      nTimeSlots.push(
        <TimeSlot
          reservationSlotStart={reservationSlotStart + ":00"}
          reservationSlotEnd={reservationSlotEnd + ":00"}
        />
      );
      reservationSlotStart++;
    }

    return (
      <React.Fragment>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            {/* Section 1: Select Time Slot */}
            {this.state.sectionNumber === 1 && (
              <React.Fragment>
                <div className={styles.image}>
                  <img src={sportImage} alt={facilitySport} />
                </div>
                <div className={styles.gradient}>
                  <div className={styles.title}>
                    {facilityName} -- ID {facilityID}
                  </div>
                  <div>Location: {facilityLocation}</div>
                  <div>Sport: {facilitySport}</div>
                  <div className={styles.timeSlotContainer}>{nTimeSlots}</div>
                </div>
              </React.Fragment>
            )}
            <button
              className={styles.close}
              onClick={this.props.onCloseModal}
              title="Close"
            >
              &times;
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CheckoutModal;

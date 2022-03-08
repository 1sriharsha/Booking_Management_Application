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
      props: { facilityID, facilityName, facilityLocation, facilitySport },
    } = this;

    let sportImage = "images/" + facilitySport + ".jpg";

    var openTime = 6;
    var closeTime = 21;
    var nTimeSlots = [];

    var reservationStart = openTime;
    var reservationEnd = openTime + 1;

    for (let index = 0; index < closeTime - openTime; index++) {
      reservationEnd = reservationStart + 1;

      nTimeSlots.push(
        <TimeSlot
          reservationStart={reservationStart + ":00"}
          reservationEnd={reservationEnd + ":00"}
        />
      );
      reservationStart += 1;
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
                  <div className={styles.timeSlotContainer}>
                    {/* <button onClick={console.log("Timeslot 6")}>
                      06:00 - 07:00
                    </button>
                    <button onClick={console.log("Timeslot 6")}>
                      06:00 - 07:00
                    </button> */}
                    {nTimeSlots}
                  </div>
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

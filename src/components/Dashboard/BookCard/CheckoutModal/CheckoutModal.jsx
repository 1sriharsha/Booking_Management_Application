import React, { Component } from "react";
import styles from "./CheckoutModal.module.css";
import "./CheckoutModal.css";
import TimeSlot from "./TimeSlot/TimeSlot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CheckoutModal extends Component {
  state = {
    sectionNumber: 1,
    reservedSlot: null,
    gearSelection: null,
    extrasSelection: null,
  };

  setPageNumber(page) {
    this.setState({ sectionNumber: page });
    console.log("Set Page to " + page);
  }

  nextPage() {
    this.setPageNumber(this.state.sectionNumber + 1);
  }

  setReservedSlot = (slot) => {
    this.setState({ reservedSlot: slot });
  };

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

    let selectedSlot = "-";
    if (this.state.reservedSlot) {
      console.log("Section True");
      selectedSlot =
        this.state.reservedSlot +
        ":00 - " +
        (this.state.reservedSlot + 1) +
        ":00";
    }

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
          reservationID={reservationSlotStart}
          reservationSlotStart={reservationSlotStart}
          reservationSlotEnd={reservationSlotEnd}
          setReservedSlot={this.setReservedSlot}
          reservedSlot={this.state.reservedSlot}
        />
      );
      reservationSlotStart++;
    }

    return (
      <React.Fragment>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.navigation}>
              <button
                className={styles.close}
                onClick={this.props.onCloseModal}
                title="Close"
              >
                &times;
              </button>
              {/* Status Bar */}
              <nav className={styles.statusBar}>
                {/* Status Bar: Time Selection */}
                <button
                  className={styles.statusSection}
                  onClick={() => this.setPageNumber(1)}
                >
                  <div className={styles.sectionIcon}>
                    <FontAwesomeIcon icon="fa-solid fa-clock" />
                  </div>
                  <div className={styles.sectionText}>
                    <div className={styles.sectionSelection}>
                      {selectedSlot}
                    </div>
                    <div className={styles.sectionTitle}>Time Slot</div>
                  </div>
                </button>
                {/* Status Bar: Gear Selection */}
                <button
                  className={styles.statusSection}
                  onClick={() => this.setPageNumber(2)}
                  disabled={this.state.reservedSlot === null}
                >
                  <div className={styles.sectionIcon}>
                    <FontAwesomeIcon icon="fa-solid fa-baseball-bat-ball" />
                  </div>
                  <div className={styles.sectionText}>
                    <div className={styles.sectionSelection}>0</div>
                    <div className={styles.sectionTitle}>Gear</div>
                  </div>
                </button>
                {/* Status Bar: Extras Selection */}
                <button
                  className={styles.statusSection}
                  onClick={() => this.setPageNumber(3)}
                  disabled={this.state.gearSelection === null}
                >
                  <div className={styles.sectionIcon}>
                    <FontAwesomeIcon icon="fa-solid fa-plus" />
                  </div>
                  <div className={styles.sectionText}>
                    <div className={styles.sectionSelection}>Referee</div>
                    <div className={styles.sectionTitle}>Extras</div>
                  </div>
                </button>
                {/* Status Bar: Book */}
                <button
                  className={styles.statusSection}
                  onClick={() => this.setPageNumber(4)}
                  disabled={this.state.extrasSelection === null}
                >
                  <div className={styles.sectionTitle}>Book</div>
                </button>
                <div className={styles.statusIndicator}></div>
              </nav>
            </div>

            {/* Section 1: Select Time Slot */}
            {this.state.sectionNumber === 1 && (
              <React.Fragment>
                <section className={styles.container}>
                  <div className={styles.title}>Select A Time Slot</div>
                  <div className={styles.timeSlotContainer}>{nTimeSlots}</div>
                  <div>
                    <button
                      className={[styles.button, styles.buttonPrimary].join(
                        " "
                      )}
                      onClick={() => this.nextPage()}
                      disabled={this.state.reservedSlot === null}
                    >
                      Next
                    </button>
                  </div>
                </section>
                {/* <div className={styles.image}>
                  <img src={sportImage} alt={facilitySport} />
                </div>
                <div className={styles.gradient}>
                  <section className={styles.content}>
                    <div className={styles.title}>
                      {facilityName} -- ID {facilityID}
                    </div>
                    <div>Location: {facilityLocation}</div>
                    <div>Sport: {facilitySport}</div>
                    <div className={styles.timeSlotContainer}>{nTimeSlots}</div>
                  </section>
                </div> */}
              </React.Fragment>
            )}
            {/* <button
              className={styles.close}
              onClick={this.props.onCloseModal}
              title="Close"
            >
              &times;
            </button> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CheckoutModal;

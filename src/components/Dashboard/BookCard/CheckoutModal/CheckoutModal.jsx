import React, { Component } from "react";
import styles from "./CheckoutModal.module.css";
import "./CheckoutModal.css";
import TimeSlot from "./TimeSlot/TimeSlot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NumberFormat from "react-number-format";
import Counters from "./Counters/Counters";

class CheckoutModal extends Component {
  state = {
    sectionNumber: 1,
    reservedSlot: null,
    reservedGear: [],
    reservedExtras: [],
    reservedSubtotal: 0,
    gearCounters: [
      {
        id: 1,
        value: 0,
        itemName: "Soccer Ball",
        itemPrice: 1.75,
        maxItems: 5,
      },
      {
        id: 2,
        value: 0,
        itemName: "Soccer Cleats",
        itemPrice: 3,
        maxItems: 12,
      },
    ],
    extrasCounters: [
      { id: 1, value: 0, itemName: "Referee", itemPrice: 20, maxItems: 3 },
      { id: 2, value: 0, itemName: "Trainer", itemPrice: 40, maxItems: 1 },
    ],
    isGearSelected: false,
    isExtrasSelected: false,
  };

  setPageNumber(page) {
    this.setState({ sectionNumber: page });
  }

  nextPage() {
    this.setPageNumber(this.state.sectionNumber + 1);
  }

  setReservedSlot = (slot) => {
    this.setState({ reservedSlot: slot });
  };

  setReservedGear = () => {
    var reservedGear = [...this.state.reservedGear];
    reservedGear = this.state.gearCounters.filter((c) => c.value > 0);
    this.setState({ reservedGear, isGearSelected: true });
  };

  setReservedExtras = () => {
    var reservedExtras = [...this.state.reservedExtras];
    reservedExtras = this.state.extrasCounters.filter((c) => c.value > 0);
    this.setState({ reservedExtras, isExtrasSelected: true });
  };

  incrementGearValue = (counter) => {
    const gearCounters = [...this.state.gearCounters];
    const index = gearCounters.indexOf(counter);

    gearCounters[index] = { ...counter };
    if (gearCounters[index].value < gearCounters[index].maxItems) {
      gearCounters[index].value++;
    }
    this.setState({ gearCounters });
  };

  incrementExtrasValue = (counter) => {
    const extrasCounters = [...this.state.extrasCounters];
    const index = extrasCounters.indexOf(counter);

    extrasCounters[index] = { ...counter };
    if (extrasCounters[index].value < extrasCounters[index].maxItems) {
      extrasCounters[index].value++;
    }
    this.setState({ extrasCounters });
  };

  decrementGearValue = (counter) => {
    const gearCounters = [...this.state.gearCounters];
    const index = gearCounters.indexOf(counter);

    gearCounters[index] = { ...counter };
    if (gearCounters[index].value > 0) {
      gearCounters[index].value--;
    }
    this.setState({ gearCounters });
  };

  decrementExtrasValue = (counter) => {
    const extrasCounters = [...this.state.extrasCounters];
    const index = extrasCounters.indexOf(counter);

    extrasCounters[index] = { ...counter };
    if (extrasCounters[index].value > 0) {
      extrasCounters[index].value--;
    }
    this.setState({ extrasCounters });
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
      selectedSlot =
        this.state.reservedSlot +
        ":00 - " +
        (this.state.reservedSlot + 1) +
        ":00";
    }

    let selectedGear = "-";
    if (this.state.gearSelection !== null) {
      selectedGear = this.state.gearSelection;
    }

    let selectedExtras = "-";
    if (this.state.extrasSelection) {
      selectedExtras = this.state.extrasSelection;
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
                  className={[
                    styles.statusSection,
                    this.state.reservedSlot ? "completedSection" : "",
                  ].join(" ")}
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
                  className={[
                    styles.statusSection,
                    this.state.isGearSelected ? "completedSection" : "",
                  ].join(" ")}
                  onClick={() => this.setPageNumber(2)}
                  disabled={this.state.reservedSlot === null}
                >
                  <div className={styles.sectionIcon}>
                    <FontAwesomeIcon icon="fa-solid fa-baseball-bat-ball" />
                  </div>
                  <div className={styles.sectionText}>
                    <div className={styles.sectionSelection}>
                      {selectedGear}
                    </div>
                    <div className={styles.sectionTitle}>Gear</div>
                  </div>
                </button>
                {/* Status Bar: Extras Selection */}
                <button
                  className={[
                    styles.statusSection,
                    this.state.isExtrasSelected ? "completedSection" : "",
                  ].join(" ")}
                  onClick={() => this.setPageNumber(3)}
                  disabled={!this.state.isGearSelected}
                >
                  <div className={styles.sectionIcon}>
                    <FontAwesomeIcon icon="fa-solid fa-plus" />
                  </div>
                  <div className={styles.sectionText}>
                    <div className={styles.sectionSelection}>
                      {selectedExtras}
                    </div>
                    <div className={styles.sectionTitle}>Extras</div>
                  </div>
                </button>
                {/* Status Bar: Sub Total */}
                <button
                  className={[styles.statusSection, styles.subTotal].join(" ")}
                  onClick={() => this.setPageNumber(4)}
                  disabled={!this.state.isExtrasSelected}
                >
                  <div className={styles.sectionTitle}>
                    <div>
                      <NumberFormat
                        prefix="$"
                        value={this.state.reservedSubtotal.toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </div>
                    <span>sub total</span>
                  </div>
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
              </React.Fragment>
            )}

            {/* Section 2: Select Gear */}
            {this.state.sectionNumber === 2 && (
              <React.Fragment>
                <section className={styles.container}>
                  <div className={styles.title}>Choose Your Gear</div>

                  <div className={styles.gearContainer}>
                    <Counters
                      counters={this.state.gearCounters}
                      onIncrement={this.incrementGearValue}
                      onDecrement={this.decrementGearValue}
                    />
                  </div>
                  <div>
                    <button
                      className={[styles.button, styles.buttonPrimary].join(
                        " "
                      )}
                      onClick={() => {
                        this.nextPage();
                        this.setReservedGear();
                      }}
                      disabled={this.state.reservedSlot === null}
                    >
                      Next
                    </button>
                  </div>
                </section>
              </React.Fragment>
            )}

            {/* Section 3: Select Extras  */}
            {this.state.sectionNumber === 3 && (
              <React.Fragment>
                <section className={styles.container}>
                  <div className={styles.title}>Upgrade Your Reservation</div>

                  <div className={styles.gearContainer}>
                    <Counters
                      counters={this.state.extrasCounters}
                      onIncrement={this.incrementExtrasValue}
                      onDecrement={this.decrementExtrasValue}
                    />
                  </div>
                  <div>
                    <button
                      className={[styles.button, styles.buttonPrimary].join(
                        " "
                      )}
                      onClick={() => {
                        this.nextPage();
                        this.setReservedExtras();
                      }}
                      disabled={this.state.reservedSlot === null}
                    >
                      Next
                    </button>
                  </div>
                </section>
              </React.Fragment>
            )}

            {/* Section 4: Checkout */}
            {this.state.sectionNumber === 4 && (
              <React.Fragment>
                <section className={styles.container}>
                  <div className={styles.title}>Checkout</div>
                </section>
              </React.Fragment>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CheckoutModal;

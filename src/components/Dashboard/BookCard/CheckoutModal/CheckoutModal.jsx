import React, { Component } from "react";
import styles from "./CheckoutModal.module.css";
import "./CheckoutModal.css";
import TimeSlot from "./TimeSlot/TimeSlot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NumberFormat from "react-number-format";
import Counters from "./Counters/Counters";

class CheckoutModal extends Component {
  state = {
    sectionNumber: 4, // TODO Reset to 1
    reservedSlot: null,
    reservedGear: [],
    reservedExtras: [],
    reservedSubtotal: 60, // TODO Reset to 0
    reservedTotal: 0,
    gearCounters: [
      // TODO Get Gear from Database
      {
        id: 1,
        value: 0,
        sportType: "Soccer",
        itemName: "Soccer Ball",
        itemPrice: 1.75,
        maxItems: 5,
      },
      {
        id: 2,
        value: 0,
        sportType: "Soccer",
        itemName: "Soccer Cleats",
        itemPrice: 3,
        maxItems: 12,
      },
      {
        id: 3,
        value: 0,
        sportType: "Basketball",
        itemName: "Basketball",
        itemPrice: 1.75,
        maxItems: 5,
      },
      {
        id: 4,
        value: 0,
        sportType: "Volleyball",
        itemName: "Volleyball",
        itemPrice: 1.75,
        maxItems: 5,
      },
      {
        id: 5,
        value: 0,
        sportType: "TableTennis",
        itemName: "Ball",
        itemPrice: 0.5,
        maxItems: 8,
      },
      {
        id: 6,
        value: 0,
        sportType: "TableTennis",
        itemName: "Racket",
        itemPrice: 2,
        maxItems: 3,
      },
      {
        id: 7,
        value: 0,
        sportType: "Squash",
        itemName: "Ball",
        itemPrice: 0.75,
        maxItems: 5,
      },
      {
        id: 8,
        value: 0,
        sportType: "Squash",
        itemName: "Racket",
        itemPrice: 2.5,
        maxItems: 4,
      },
      {
        id: 9,
        value: 0,
        sportType: "Badminton",
        itemName: "Shuttlecock",
        itemPrice: 0.5,
        maxItems: 10,
      },
      {
        id: 10,
        value: 0,
        sportType: "Badminton",
        itemName: "Racket",
        itemPrice: 2.5,
        maxItems: 4,
      },
    ],
    extrasCounters: [
      // TODO Get Extras from Database
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

  getReservedGearCount = () => {
    let count = 0;

    for (let index = 0; index < this.state.reservedGear.length; index++) {
      const element = this.state.reservedGear[index];
      count += element.value;
    }
    return count;
  };

  setReservedExtras = () => {
    var reservedExtras = [...this.state.reservedExtras];
    reservedExtras = this.state.extrasCounters.filter((c) => c.value > 0);
    this.setState({ reservedExtras, isExtrasSelected: true });
  };

  getReservedExtrasCount = () => {
    let count = 0;

    for (let index = 0; index < this.state.reservedExtras.length; index++) {
      const element = this.state.reservedExtras[index];
      count += element.value;
    }
    return count;
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
        facilityInfo,
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
                      {this.state.reservedSlot
                        ? this.state.reservedSlot +
                          ":00 - " +
                          (this.state.reservedSlot + 1) +
                          ":00"
                        : "-"}
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
                      {this.state.isGearSelected
                        ? this.state.reservedGear.length > 0
                          ? this.getReservedGearCount()
                          : "None"
                        : "-"}
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
                      {this.state.isExtrasSelected
                        ? this.state.reservedExtras.length > 0
                          ? this.getReservedExtrasCount()
                          : "None"
                        : "-"}
                    </div>
                    <div className={styles.sectionTitle}>Extras</div>
                  </div>
                </button>
                {/* Status Bar: Sub Total */}
                <button
                  className={[styles.statusSection, styles.subTotal].join(" ")}
                  onClick={() => {
                    this.setPageNumber(4);
                    this.setReservedGear();
                    this.setReservedExtras();
                  }}
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
                      counters={this.state.gearCounters.filter(
                        (c) => c.sportType === facilitySport
                      )}
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
                        this.setReservedGear();
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
                  {/* <div className={styles.title}>Checkout</div> */}

                  <main className={styles.checkout}>
                    {/* Checkout Payment Information */}
                    <aside className={styles.payment}>
                      <div className={styles.title}>
                        Enter your payment details
                      </div>
                      <form>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="Card Number"
                        />
                        <input
                          type="text"
                          id="streetAddress"
                          name="streetAddress"
                          placeholder="Street Address"
                        />
                        <input
                          type="text"
                          id="aptAddress"
                          name="aptAddress"
                          placeholder="Apt, unit, suite, etc. (optional)"
                        />
                        <select name="country" id="country">
                          <option value="United States">United States</option>
                        </select>
                        <div>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="City"
                          />
                          <select name="state" id="state">
                            <option value="-">-</option>
                            <option value="IN">IN</option>
                          </select>
                          <input
                            type="text"
                            id="zip"
                            name="zip"
                            placeholder="Zip Code"
                          />
                        </div>
                      </form>
                    </aside>
                    {/* Checkout Summary */}
                    <aside className={styles.summary}>
                      {/* Summary Title */}
                      <div className={styles.title}>Summary</div>
                      {/* Summary Image */}
                      <div className={styles.image}>
                        <img src={sportImage} alt={facilitySport} />
                      </div>
                      {/* Summary Details */}
                      <div className={styles.summaryDetails}>
                        {/* Facility Name */}
                        <div className={styles.name}>{facilityName}</div>
                        {/* Facility Location */}
                        <div className={styles.location}>
                          <i>
                            <FontAwesomeIcon icon="fa-solid fa-location-arrow" />
                          </i>
                          {facilityLocation}
                        </div>
                        {/* Facility Description */}
                        <div className={styles.description}>
                          <i>
                            <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                          </i>
                          {facilityInfo}
                        </div>
                        {/* Reserved Gear & Extras */}
                        <div className={styles.reservedOptions}>
                          <div className={styles.itemName}>Soccer Ball</div>{" "}
                          <div className={styles.itemCount}>x100</div>{" "}
                          <div className={styles.itemsTotal}>
                            <NumberFormat
                              prefix="$"
                              value={(100.0).toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                          </div>
                        </div>
                        {/* Subtotal, Tax, & Total */}
                        <div className={styles.reservedPricing}>
                          <div>
                            Subtotal:
                            <NumberFormat
                              value={this.state.reservedSubtotal.toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                          </div>
                          <div>
                            Tax:
                            <NumberFormat
                              value={(
                                this.state.reservedSubtotal * 0.07
                              ).toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                          </div>
                          <div className={styles.reservedTotal}>
                            Total:
                            <NumberFormat
                              prefix="$"
                              value={this.state.reservedTotal.toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                          </div>
                        </div>
                      </div>
                      {/* Payment Button */}
                      <button
                        className={[styles.button, styles.buttonPrimary].join(
                          " "
                        )}
                      >
                        Pay
                        <NumberFormat
                          prefix="$"
                          value={this.state.reservedTotal.toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </button>
                    </aside>
                  </main>
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

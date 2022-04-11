import React, { Component } from "react";
import InputMask from "react-input-mask";
import styles from "./CheckoutModal.module.css";
import "./CheckoutModal.css";
import TimeSlot from "./TimeSlot/TimeSlot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NumberFormat from "react-number-format";
import Counters from "./Counters/Counters";
import { ExtrasData, GearData } from "../../../../data";
import uniqid from "uniqid";
import axios from "axios";
const {
  REACT_APP_LOCAL_URL,
  REACT_APP_PRODUCTION_URL,
  REACT_APP_CLIENT_ID,
  REACT_APP_API_KEY,
} = process.env;

class CheckoutModal extends Component {
  state = {
    facilityID: this.props.facilityID,
    uniqFacId: this.props.uniqFacId,
    facilityName: this.props.facilityName,
    facilityLocation: this.props.facilityLocation,
    facilitySport: this.props.facilitySport,
    sectionNumber: 1,
    reservedSlot: null,
    reservedGear: [],
    reservedExtras: [],
    reservationSubtotal: 0,
    reservationTax: 0,
    reservationTotal: 0,
    taxRate: 0.07,
    gearCounters: GearData,
    extrasCounters: ExtrasData,
    isGearSelected: false,
    isExtrasSelected: false,
  };

  onPay = () => {
    console.log(this.state.uniqFacId);
    
    if (!this.props.isAuthenticated) {
      this.props.onShowModal("login");
    } else {
      var api_url;
      if (process.env.NODE_ENV === "production") {
        api_url = REACT_APP_PRODUCTION_URL;
      } else {
        api_url = REACT_APP_LOCAL_URL;
      }

      axios({
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": api_url,
        },
        withCredentials: true,
        url: api_url + "/book/add",
        data: {
          facilityID: this.state.uniqFacId,
          firstName: this.props.userFirstName,
          lastName: this.props.userLastName,
          email: this.props.userEmail,
          gear: this.state.reservedGear,
          intime: this.state.reservedSlot,
          outtime: this.state.reservedSlot + 1,
          upgrade: this.state.reservedExtras,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            console.log("Booked Successfully");
            this.props.handleRefresh();
            this.props.onCloseModal();
          }
        })
        .catch(function (err) {
          console.log(err);
          if (err.response) {
            if (err.response.status === 404) {
              console.log("Couldn't Book");
            }
          } else if (err.request) {
            //Response not received from API
            console.log("Error: ", err.request);
          } else {
            //Unexpected Error
            console.log("Error", err.message);
          }
        });
    }
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
      this.updateCosts(gearCounters[index].itemPrice);
    }
    this.setState({ gearCounters });
  };

  incrementExtrasValue = (counter) => {
    const extrasCounters = [...this.state.extrasCounters];
    const index = extrasCounters.indexOf(counter);

    extrasCounters[index] = { ...counter };
    if (extrasCounters[index].value < extrasCounters[index].maxItems) {
      extrasCounters[index].value++;
      this.updateCosts(extrasCounters[index].itemPrice);
    }
    this.setState({ extrasCounters });
  };

  decrementGearValue = (counter) => {
    const gearCounters = [...this.state.gearCounters];
    const index = gearCounters.indexOf(counter);

    gearCounters[index] = { ...counter };
    if (gearCounters[index].value > 0) {
      gearCounters[index].value--;
      this.updateCosts(-gearCounters[index].itemPrice);
    }
    this.setState({ gearCounters });
  };

  decrementExtrasValue = (counter) => {
    const extrasCounters = [...this.state.extrasCounters];
    const index = extrasCounters.indexOf(counter);

    extrasCounters[index] = { ...counter };
    if (extrasCounters[index].value > 0) {
      extrasCounters[index].value--;
      this.updateCosts(-extrasCounters[index].itemPrice);
    }
    this.setState({ extrasCounters });
  };

  updateCosts = (change) => {
    var reservationSubtotal = this.state.reservationSubtotal;
    var reservationTax;
    var reservationTotal;

    reservationSubtotal += change;
    reservationTax = reservationSubtotal * this.state.taxRate;
    reservationTotal = reservationSubtotal + reservationTax;

    this.setState({
      reservationSubtotal,
      reservationTax,
      reservationTotal,
    });
  };

  // Summary Details Scroll Shadow
  createScrollShadow() {
    const summaryDetails = this.refDetails;
    const content = this.refContent;
    const shadowTop = this.refShadowTop;
    const shadowBottom = this.refShadowBottom;

    // Only show shadow if content is scrollable
    if (content.scrollHeight > summaryDetails.clientHeight) {
      shadowTop.style.display = "block";
      shadowBottom.style.display = "block";
      let contentScrollHeight =
        content.scrollHeight - summaryDetails.offsetHeight;

      content.addEventListener("scroll", function () {
        var currentScroll = this.scrollTop / contentScrollHeight;
        shadowTop.style.opacity = currentScroll;
        shadowBottom.style.opacity = 1 - currentScroll;
      });
    }
  }

  componentDidUpdate() {
    if (this.state.sectionNumber === 4) {
      this.createScrollShadow();
    }
  }

  render() {
    const {
      props: {
        facilityID,
        uniqFacId,
        facilityName,
        facilityLocation,
        facilitySport,
        facilityInfo,
        reservationPeriodStart,
        reservationPeriodEnd,
      },
    } = this;

    let sportImage =
      "images/" +
      facilitySport.toString().toLowerCase().replace(/ /g, "") +
      ".jpg";

    var nTimeSlots = [];
    var reservationSlotStart = reservationPeriodStart;
    var reservationSlotEnd;
    var key = 0;
    for (
      let index = 0;
      index < reservationPeriodEnd - reservationPeriodStart;
      index++
    ) {
      reservationSlotEnd = reservationSlotStart + 1;

      nTimeSlots.push(
        <TimeSlot
          key={uniqid(key, "-timeslot")}
          reservationID={reservationSlotStart}
          reservationSlotStart={reservationSlotStart}
          reservationSlotEnd={reservationSlotEnd}
          setReservedSlot={this.setReservedSlot}
          reservedSlot={this.state.reservedSlot}
        />
      );
      reservationSlotStart++;
    }

    // List of Selected Gear & Extras
    const combinedOptions = this.state.reservedGear.concat(
      this.state.reservedExtras
    );
    const optionsList = combinedOptions.map(
      ({ itemName, value, itemPrice }) => {
        return (
          <React.Fragment>
            <div key={uniqid("", "-optionslist")}>
              <div className={styles.itemName}>{itemName}</div>
              <div className={styles.itemCount}>x{value}</div>
              <div className={styles.itemsTotal}>
                <NumberFormat
                  prefix="$"
                  value={(itemPrice * value).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </div>
            </div>
          </React.Fragment>
        );
      }
    );

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
                        value={this.state.reservationSubtotal.toFixed(2)}
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
                          id="name"
                          type="text"
                          name="cardholder"
                          placeholder="Card Holder Name"
                          autoComplete={"cc-name"}
                        />
                        <InputMask
                          id="cardnumber"
                          mask={"9999 9999 9999 9999"}
                          type={"text"}
                          placeholder="Card Number"
                          autoComplete={"cc-number"}
                        ></InputMask>
                        <div>
                          <InputMask
                            id="expirationdate"
                            mask={"99/99"}
                            type={"text"}
                            placeholder="MM/YY"
                            autoComplete={"cc-exp"}
                          ></InputMask>
                          <InputMask
                            id="securitycode"
                            mask={"999"}
                            type={"text"}
                            placeholder="CVV"
                            autoComplete={"cc-csc"}
                          ></InputMask>
                        </div>
                        <input
                          type="text"
                          id="streetAddress"
                          name="streetAddress"
                          placeholder="Street Address"
                          autoComplete={"street-address"}
                        />
                        <input
                          type="text"
                          id="aptAddress"
                          name="aptAddress"
                          placeholder="Apt, unit, suite, etc. (optional)"
                          autoComplete={"address-line2"}
                        />
                        <select
                          name="country"
                          id="country"
                          autoComplete={"country"}
                        >
                          <option value="-">-</option>
                          <option value="United States">United States</option>
                        </select>
                        <div>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="City"
                            autoComplete={"address-level2"}
                          />
                          <select
                            name="state"
                            id="state"
                            autoComplete={"address-level1"}
                          >
                            <option value="-">-</option>
                            <option value="IN">IN</option>
                          </select>
                          <input
                            type="text"
                            id="zip"
                            name="zip"
                            placeholder="Zip Code"
                            autoComplete={"postal-code"}
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
                      <div
                        className={styles.summaryDetails}
                        ref={(refDetails) => {
                          this.refDetails = refDetails;
                        }}
                      >
                        <div
                          className={styles.summaryContent}
                          ref={(refContent) => {
                            this.refContent = refContent;
                          }}
                        >
                          <div
                            className={styles.shadowTop}
                            ref={(refShadowTop) => {
                              this.refShadowTop = refShadowTop;
                            }}
                          ></div>
                          <div
                            className={styles.shadowBottom}
                            ref={(refShadowBottom) => {
                              this.refShadowBottom = refShadowBottom;
                            }}
                          ></div>
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
                          {(this.state.reservedGear.length > 0 ||
                            this.state.reservedExtras.length > 0) && (
                            <React.Fragment>
                              <div className={styles.reservedOptions}>
                                {optionsList}
                              </div>
                            </React.Fragment>
                          )}
                          {/* Subtotal, Tax, & Total */}
                          <div className={styles.reservedPricing}>
                            <div>
                              Subtotal:
                              <NumberFormat
                                prefix="$"
                                value={this.state.reservationSubtotal.toFixed(
                                  2
                                )}
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                            </div>
                            <div>
                              Tax:
                              <NumberFormat
                                prefix="$"
                                value={this.state.reservationTax.toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                            </div>
                            <div className={styles.reservationTotal}>
                              Total:
                              <NumberFormat
                                prefix="$"
                                value={this.state.reservationTotal.toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Payment Button */}
                      <button
                        onClick={this.onPay}
                        className={[styles.button, styles.buttonPrimary].join(
                          " "
                        )}
                      >
                        Pay
                        <NumberFormat
                          prefix="$"
                          value={this.state.reservationTotal.toFixed(2)}
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

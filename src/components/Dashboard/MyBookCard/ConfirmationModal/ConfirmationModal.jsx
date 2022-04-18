import React, { Component } from "react";
import styles from "./ConfirmationModal.module.css";
import QRCode from "react-qr-code";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NumberFormat from "react-number-format";
import uniqid from "uniqid";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MapSection from './Map/Map'
const { REACT_APP_LOCAL_URL, REACT_APP_PRODUCTION_URL,REACT_APP_API_KEY } = process.env;


class ConfirmationModal extends Component {
  state = {
    sectionNumber: 1,
  };

  setPageNumber(page) {
    this.setState({ sectionNumber: page });
  }

  nextPage() {
    this.setPageNumber(this.state.sectionNumber + 1);
  }

  hashCode(code) {
    var hash = 0,
      i,
      chr;
    if (code.length === 0) return hash;
    for (i = 0; i < code.length; i++) {
      chr = code.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return String(hash);
  }

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

  componentDidMount() {
    if (this.state.sectionNumber === 1) {
      this.createScrollShadow();
    }
  }

  componentDidUpdate() {
    if (this.state.sectionNumber === 1) {
      this.createScrollShadow();
    }
  }

  render() {
    const location = {
      address: "1600 Amphitheatre Parkway, Mountain View, california.",
      lat: 37.42216,
      lng: -122.08427,
    }; // our location object from earlier

    const {
      props: { facilityName, facilityLocation, facilitySport, facilityInfo },
    } = this;
    console.log(facilityLocation); // TODO Remove

    let sportImage =
      "images/" +
      facilitySport.toString().toLowerCase().replace(/ /g, "") +
      ".jpg";

    // List of Selected Gear & Extras
    const combinedOptions = this.props.gear.concat(this.props.upgrade);

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

    const qrValue = `Facility Name: ${this.props.facilityName}\nFacility Location: ${this.props.facilityLocation.city}, ${this.props.facilityLocation.state}\nIntime: ${this.props.intime}\nOuttime: ${this.props.outtime}\nBooking ID: ${this.props.bookingID}`;
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
                {/* Status Bar: Reservation Summary */}
                <button
                  className={[
                    styles.statusSection,
                    this.state.sectionNumber === 1 ? "completedSection" : "",
                  ].join(" ")}
                  onClick={() => this.setPageNumber(1)}
                >
                  <div className={styles.sectionIcon}>
                    <FontAwesomeIcon icon="fa-solid fa-bars-progress" />
                  </div>
                  <div className={styles.sectionText}>
                    <div className={styles.sectionSelection}>Reservation</div>
                    <div className={styles.sectionTitle}>Summary</div>
                  </div>
                </button>
                {/* Status Bar: Check In Information  */}
                <button
                  className={[
                    styles.statusSection,
                    this.state.sectionNumber === 2 ? "completedSection" : "",
                  ].join(" ")}
                  onClick={() => this.setPageNumber(2)}
                >
                  <div className={styles.sectionIcon}>
                    <FontAwesomeIcon icon="fa-solid fa-qrcode" />
                  </div>
                  <div className={styles.sectionText}>
                    <div className={styles.sectionSelection}>Check In</div>
                    <div className={styles.sectionTitle}>Information</div>
                  </div>
                </button>
              </nav>
            </div>

            {/* Reservation Summary */}
            {this.state.sectionNumber === 1 && (
              <React.Fragment>
                <section className={styles.container}>
                  <main className={styles.checkout}>
                    {/* Google Map Integration */}
                    <aside className={styles.mapContainer}>
                      <section className={styles.title}>Directions</section>

                      <section>
                        <MapSection
                          facilityLocation={facilityLocation}
                          zoomLevel={17}
                        />
                      </section>
                    </aside>

                    {/* Summary */}
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
                            {facilityLocation.city +
                              ", " +
                              facilityLocation.state}
                          </div>
                          {/* Facility Description */}
                          <div className={styles.description}>
                            <i>
                              <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                            </i>
                            {facilityInfo}
                          </div>
                          {/* Reserved Gear & Extras */}
                          {(this.props.gear.length > 0 ||
                            this.props.upgrade.length > 0) && (
                            <React.Fragment>
                              <div className={styles.reservedOptions}>
                                {optionsList}
                              </div>
                            </React.Fragment>
                          )}
                          {/* Subtotal, Tax, & Total */}
                          {/* <div className={styles.reservedPricing}>
                      <div>
                        Subtotal:
                        <NumberFormat
                          prefix="$"
                          value={this.state.reservationSubtotal.toFixed(2)}
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
                    </div> */}
                        </div>
                      </div>
                    </aside>
                  </main>
                </section>
              </React.Fragment>
            )}

            {this.state.sectionNumber === 2 && (
              <section className={styles.container}>
                <div className={styles.title}>Check In</div>
                <div className={styles.code}>
                  <QRCode
                    title="Check In Code"
                    value={qrValue}
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    level="L"
                  />
                  <div>
                    Please use the above code to check in for your reservation.
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ConfirmationModal;

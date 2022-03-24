import React, { Component } from "react";
import styles from "./AddModal.module.css";
import "./AddModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AddModal extends Component {
  state = {
    sectionNumber: 1,
    facilityName: "",
    facilityLocation: "",
    facilitySport: "",
    facilityInfo: "",
    reservationPeriodStart: null,
    reservationPeriodEnd: null,
    isError: false,
  };

  setPageNumber(page) {
    this.setState({ sectionNumber: page });
  }

  nextPage() {
    this.setPageNumber(this.state.sectionNumber + 1);
  }

  setFacility = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setReservation = (e) => {
    this.setState(
      { [e.target.name]: e.target.value },
      this.validateReservation
    );
  };

  validateReservation = () => {
    if (
      parseInt(this.state.reservationPeriodEnd) <
      parseInt(this.state.reservationPeriodStart)
    ) {
      this.setState({ isError: true });
    } else {
      this.setState({ isError: false });
    }
  };

  onSubmit = () => {
    console.log("Submitted");
  };

  render() {
    let timeOptions = [];
    for (let index = 0; index < 24; index++) {
      timeOptions.push(<option value={index}>{index + ":00"}</option>);
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
                {/* Status Bar: Facility Information */}
                <button
                  className={[
                    styles.statusSection,
                    this.state.facilityName &&
                    this.state.facilityLocation &&
                    this.state.facilitySport &&
                    this.state.facilityInfo
                      ? "completedSection"
                      : "",
                  ].join(" ")}
                  onClick={() => this.setPageNumber(1)}
                >
                  <div className={styles.sectionIcon}>
                    <FontAwesomeIcon icon="fa-solid fa-building" />
                  </div>
                  <div className={styles.sectionText}>
                    <div className={styles.sectionSelection}>
                      {this.state.facilityName ? this.state.facilityName : "-"}
                    </div>
                    <div className={styles.sectionTitle}>
                      Facility Information
                    </div>
                  </div>
                </button>
                {/* Status Bar: Reservation Period */}
                <button
                  className={[
                    styles.statusSection,
                    this.state.reservationPeriodStart &&
                    this.state.reservationPeriodEnd &&
                    !this.state.isError
                      ? "completedSection"
                      : "",
                  ].join(" ")}
                  onClick={() => this.setPageNumber(2)}
                  disabled={
                    !(
                      this.state.facilityName &&
                      this.state.facilityLocation &&
                      this.state.facilitySport &&
                      this.state.facilityInfo
                    )
                  }
                >
                  <div className={styles.sectionIcon}>
                    <FontAwesomeIcon icon="fa-solid fa-clock" />
                  </div>
                  <div className={styles.sectionText}>
                    <div className={styles.sectionSelection}>
                      {this.state.reservationPeriodStart &&
                      this.state.reservationPeriodEnd
                        ? this.state.reservationPeriodStart +
                          ":00 - " +
                          this.state.reservationPeriodEnd +
                          ":00"
                        : "-"}
                    </div>
                    <div className={styles.sectionTitle}>
                      Reservation Period
                    </div>
                  </div>
                </button>
              </nav>
            </div>
            {/* Section 1: Facility Information */}
            {this.state.sectionNumber === 1 && (
              <React.Fragment>
                <div className={styles.container}>
                  <form>
                    {/* Facility Name */}
                    <label htmlFor="facilityName">Facility Name</label>
                    <input
                      name="facilityName"
                      type="text"
                      placeholder="Bloomington Recreation Center"
                      onChange={(e) => this.setFacility(e)}
                      value={this.state.facilityName}
                    />

                    {/* Facility Location */}
                    <label htmlFor="facilityLocation">Facility Location</label>
                    <input
                      name="facilityLocation"
                      type="text"
                      placeholder="Bloomington, IN"
                      onChange={(e) => this.setFacility(e)}
                      value={this.state.facilityLocation}
                    />

                    {/* Facility Sport */}
                    <label htmlFor="facilitySport">Facility Sport</label>
                    <input
                      name="facilitySport"
                      type="text"
                      placeholder="Soccer"
                      onChange={(e) => this.setFacility(e)}
                      value={this.state.facilitySport}
                    />

                    {/* Court/Field Description */}
                    <label htmlFor="facilityInfo">Court Description</label>
                    <input
                      name="facilityInfo"
                      type="text"
                      placeholder="Soccer Field #06A"
                      onChange={(e) => this.setFacility(e)}
                      value={this.state.facilityInfo}
                    />
                  </form>
                  <button
                    className={[styles.button, styles.buttonPrimary].join(" ")}
                    onClick={() => this.nextPage()}
                    disabled={
                      !(
                        this.state.facilityName &&
                        this.state.facilityLocation &&
                        this.state.facilitySport &&
                        this.state.facilityInfo
                      )
                    }
                  >
                    Next
                  </button>
                </div>
              </React.Fragment>
            )}
            {/* Section 2: Reservation Period */}
            {this.state.sectionNumber === 2 && (
              <React.Fragment>
                <div className={styles.reservationContainer}>
                  <main>
                    <section>
                      <div className={styles.subtitle}>
                        What time does {this.state.facilityName}{" "}
                        <span>begin</span> accepting reservations?
                      </div>
                      <select
                        name="reservationPeriodStart"
                        onChange={this.setReservation}
                      >
                        {timeOptions}
                      </select>
                    </section>
                    <section>
                      <div className={styles.subtitle}>
                        What time does {this.state.facilityName}{" "}
                        <span>stop</span> accepting reservations?
                      </div>
                      <select
                        name="reservationPeriodEnd"
                        onChange={this.setReservation}
                      >
                        {timeOptions}
                      </select>
                      {this.state.isError && (
                        <div className={styles.error}>
                          Reservation period must end after{" "}
                          {this.state.reservationPeriodStart + ":00"}.
                        </div>
                      )}
                    </section>
                  </main>
                  <button
                    className={[styles.button, styles.buttonPrimary].join(" ")}
                    onClick={() => this.onSubmit()}
                    disabled={
                      !(
                        this.state.reservationPeriodStart &&
                        this.state.reservationPeriodEnd &&
                        !this.state.isError
                      )
                    }
                  >
                    Submit
                  </button>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddModal;

import React, { Component } from "react";
import styles from "./AddFacility.module.css";
import "./AddFacility.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import axios from "axios";
const {
  REACT_APP_LOCAL_URL,
  REACT_APP_PRODUCTION_URL,
  REACT_APP_CLIENT_ID,
  REACT_APP_API_KEY,
} = process.env;

class AddFacility extends Component {
  state = {
    sectionNumber: 1,
    facilityName: "",
    facilityLocation: "",
    facilitySport: "",
    facilityInfo: "",
    reservationPeriodStart: null,
    reservationPeriodEnd: null,
    isError: false,
    locationPlaceholder: "1601 Law Lane Bloomington, IN 47408",
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

  setLocation = (location) => {
    this.setState({
      facilityLocation: {
        place_id: location.value.place_id,
        address: location.value.description,
        locationPlaceholder: location.label,
      },
    });
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
    var api_url;
    if (process.env.NODE_ENV === "production") {
      api_url = REACT_APP_PRODUCTION_URL;
    } else {
      api_url = REACT_APP_LOCAL_URL;
    }
    var newFacilityData = {
      facilityName: this.state.facilityName,
      facilityLocation: this.state.facilityLocation,
      facilitySport: this.state.facilitySport,
      facilityInfo: this.state.facilityInfo,
      reservationPeriodStart: this.state.reservationPeriodStart,
      reservationPeriodEnd: this.state.reservationPeriodEnd,
    };
    console.log(newFacilityData);
    axios({
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": api_url,
      },
      withCredentials: true,
      url: api_url + "/facilities/add",
      data: { newFacilityData },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("Facility Added Sucessfully");
        }
      })
      .catch(function (err) {
        console.log(err);
        if (err.response) {
          if (err.response.status === 404) {
            console.log("Couldn't add Facility");
          }
        } else if (err.request) {
          //Response not received from API
          console.log("Error: ", err.request);
        } else {
          //Unexpected Error
          console.log("Error", err.message);
        }
      });

    this.props.onCloseModal();
  };

  render() {
    let timeOptions = [];
    for (let index = 0; index < 24; index++) {
      timeOptions.push(<option value={index}>{index + ":00"}</option>);
    }
    return (
      <React.Fragment>
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
                <div className={styles.sectionTitle}>Facility Information</div>
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
                <div className={styles.sectionTitle}>Reservation Period</div>
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
                  placeholder="Student Recreational Sports Center"
                  onChange={(e) => this.setFacility(e)}
                  value={this.state.facilityName}
                  maxLength={50}
                />

                {/* Facility Location */}
                <label htmlFor="facilityLocation">Facility Location</label>
                <GooglePlacesAutocomplete
                  apiKey={REACT_APP_API_KEY}
                  autocompletionRequest={{
                    componentRestrictions: {
                      country: ["us"],
                    },
                  }}
                  selectProps={{
                    placeholder: this.state.locationPlaceholder,
                    onChange: this.setLocation,
                    styles: {
                      placeholder: (provided) => ({
                        ...provided,
                        fontStyle: "italic",
                        color: "var(--color-gray)",
                      }),
                      input: (provided) => ({
                        // Input
                        ...provided,
                        boxShadow: "none",
                      }),
                    },
                  }}
                />

                {/* Facility Sport */}
                <label htmlFor="facilitySport">Facility Sport</label>
                <input
                  name="facilitySport"
                  type="text"
                  placeholder="Soccer"
                  onChange={(e) => this.setFacility(e)}
                  value={this.state.facilitySport}
                  maxLength={50}
                />

                {/* Court/Field Description */}
                <label htmlFor="facilityInfo">Court Description</label>
                <input
                  name="facilityInfo"
                  type="text"
                  placeholder="Soccer Field #06A"
                  onChange={(e) => this.setFacility(e)}
                  value={this.state.facilityInfo}
                  maxLength={150}
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
                    What time does{" "}
                    <span className={styles.bold}>
                      {this.state.facilityName}
                    </span>{" "}
                    <span className={styles.underline}>begin</span> accepting
                    reservations?
                  </div>
                  <select
                    name="reservationPeriodStart"
                    onChange={this.setReservation}
                    value={this.state.reservationPeriodStart}
                  >
                    {timeOptions}
                  </select>
                </section>
                <section>
                  <div className={styles.subtitle}>
                    What time does{" "}
                    <span className={styles.bold}>
                      {this.state.facilityName}
                    </span>{" "}
                    <span className={styles.underline}>stop</span> accepting
                    reservations?
                  </div>
                  <select
                    name="reservationPeriodEnd"
                    onChange={this.setReservation}
                    value={this.state.reservationPeriodEnd}
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
      </React.Fragment>
    );
  }
}

export default AddFacility;

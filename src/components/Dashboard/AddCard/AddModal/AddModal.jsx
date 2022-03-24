import React, { Component } from "react";
import InputMask from "react-input-mask";
import styles from "./AddModal.module.css";
import "./AddModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NumberFormat from "react-number-format";

class AddModal extends Component {
  state = {
    sectionNumber: 1,
    facilityName: "",
    facilityLocation: "",
    facilitySport: "",
    facilityInfo: "",
    reservationPeriodStart: null,
    reservationPeriodEnd: null,
  };

  setPageNumber(page) {
    this.setState({ sectionNumber: page });
  }

  nextPage() {
    this.setPageNumber(this.state.sectionNumber + 1);
  }

  render() {
    const {
      props: {},
    } = this;

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
                    this.state.facilityName ? "completedSection" : "",
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
                    this.state.reservationPeriodEnd
                      ? "completedSection"
                      : "",
                  ].join(" ")}
                  onClick={() => this.setPageNumber(2)}
                  disabled={this.state.facilityName === ""}
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
                    <label htmlFor="name">Facility Name</label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Bloomington Recreation Center"
                    />

                    {/* Facility Location */}
                    <label htmlFor="location">Facility Location</label>
                    <input
                      name="location"
                      type="text"
                      placeholder="Bloomington, IN"
                    />

                    {/* Facility Sport */}
                    <label htmlFor="sport">Facility Sport</label>
                    <input name="sport" type="text" placeholder="Soccer" />

                    {/* Court/Field Description */}
                    <label htmlFor="description">Court Description</label>
                    <input
                      name="description"
                      type="text"
                      placeholder="Soccer Field #06A"
                    />
                  </form>
                  <button
                    className={[styles.button, styles.buttonPrimary].join(" ")}
                    onClick={() => this.nextPage()}
                    disabled={this.state.reservedSlot === null}
                  >
                    Next
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

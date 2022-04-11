import React, { Component } from "react";
import styles from "./ConfirmationModal.module.css";
import QRCode from "react-qr-code";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
                {/* Status Bar: */}
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
                {/* Status Bar:  */}
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

            {this.state.sectionNumber === 2 && (
              <section className={styles.container}>
                <div className={styles.title}>Check In</div>
                <div className={styles.code}>
                  <QRCode
                    title="Check In Code"
                    value={this.hashCode(this.props.qrValue)}
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

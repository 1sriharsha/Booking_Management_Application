import React, { Component } from "react";
import styles from "./ConfirmationModal.module.css";
import QRCode from "react-qr-code";

class ConfirmationModal extends Component {
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
            <button
              className={styles.close}
              onClick={this.props.onCloseModal}
              title="Close"
            >
              &times;
            </button>

            <section className={styles.container}>
              <div className={styles.title}>Confirmation</div>
              <div>
                <QRCode
                  title="Check-In Code"
                  value={this.hashCode(this.props.qrValue)}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                  level="L"
                />
              </div>
            </section>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ConfirmationModal;

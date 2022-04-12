import React, { Component } from "react";
import styles from "./PaymentModal.module.css";
import InputMask from "react-input-mask";

class PaymentModal extends Component {
  state = {};
  render() {
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
            <div className={styles.container}>
              <aside className={styles.payment}>
                <div className={styles.title}>Enter your payment details</div>
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
                  <select name="country" id="country" autoComplete={"country"}>
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
              <section>
                <button
                  onClick={this.props.onCloseModal}
                  className={[styles.button, styles.buttonPrimary].join(" ")}
                >
                  Submit
                </button>
              </section>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PaymentModal;

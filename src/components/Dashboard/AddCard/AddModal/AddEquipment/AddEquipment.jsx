import React, { Component } from "react";
import styles from "./AddEquipment.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
const {
  REACT_APP_LOCAL_URL,
  REACT_APP_PRODUCTION_URL,
  REACT_APP_CLIENT_ID,
  REACT_APP_API_KEY,
} = process.env;

class AddEquipment extends Component {
  state = {
    sectionNumber: 1,
    itemName: "",
    itemCategory: "",
    itemPrice: null,
    maxItems: null,
  };

  setEquipment = (e) => {
    this.setState(
      { [e.target.name]: e.target.value },
      this.validateReservation
    );
  };

  onSubmit = () => {
    var api_url;
    if (process.env.NODE_ENV === "production") {
      api_url = REACT_APP_PRODUCTION_URL;
    } else {
      api_url = REACT_APP_LOCAL_URL;
    }
    var newEquipmentData = {
      itemName: this.state.itemName,
      itemCategory: this.state.itemCategory,
      itemPrice: this.state.itemPrice,
      maxItems: this.state.maxItems,
    };
    console.log(newEquipmentData);
    axios({
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": api_url,
      },
      withCredentials: true,
      url: api_url + "/promotions/add",
      data: { newEquipmentData },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("Equipment Added Sucessfully");
        }
      })
      .catch(function (err) {
        console.log(err);
        if (err.response) {
          if (err.response.status === 404) {
            console.log("Couldn't add Equipment");
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
            {/* Status Bar: Item Information */}
            <button
              className={[
                styles.statusSection,
                this.state.itemName &&
                this.state.itemCategory &&
                this.state.itemPrice &&
                this.state.maxItems
                  ? "completedSection"
                  : "",
              ].join(" ")}
            >
              <div className={styles.sectionIcon}>
                <FontAwesomeIcon icon="fa-solid fa-medal" />
              </div>
              <div className={styles.sectionText}>
                <div className={styles.sectionSelection}>
                  {this.state.itemName ? this.state.itemName : "-"}
                </div>
                <div className={styles.sectionTitle}>Equipment Information</div>
              </div>
            </button>
          </nav>
        </div>
        {/* Section 1: Equipment Information */}
        {this.state.sectionNumber === 1 && (
          <React.Fragment>
            <div className={styles.container}>
              <form>
                {/* Item Name */}
                <label htmlFor="itemName">Item Name</label>
                <input
                  name="itemName"
                  type="text"
                  placeholder="Soccer Ball"
                  onChange={(e) => this.setEquipment(e)}
                  value={this.state.itemName}
                  maxLength={50}
                />

                {/* Item Category */}
                <label htmlFor="itemCategory">Item Category</label>
                <input
                  name="itemCategory"
                  type="text"
                  placeholder="Soccer"
                  onChange={(e) => this.setEquipment(e)}
                  value={this.state.itemCategory}
                />

                {/* Item Price */}
                <label htmlFor="itemPrice">Item Price</label>
                <input
                  name="itemPrice"
                  type="text"
                  placeholder="$1.75"
                  onChange={(e) => this.setEquipment(e)}
                  value={this.state.itemPrice}
                />

                {/* Max Items */}
                <label htmlFor="maxItems">Max Items per Reservation</label>
                <input
                  name="maxItems"
                  type="text"
                  placeholder="5"
                  onChange={(e) => this.setEquipment(e)}
                  value={this.state.maxItems}
                />
              </form>
              <button
                className={[styles.button, styles.buttonPrimary].join(" ")}
                onClick={() => this.onSubmit()}
                disabled={
                  !(
                    this.state.itemName &&
                    this.state.itemCategory &&
                    this.state.itemPrice &&
                    this.state.maxItems
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

export default AddEquipment;

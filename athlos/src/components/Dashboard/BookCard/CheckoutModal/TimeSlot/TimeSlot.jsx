import React, { Component } from "react";
import styles from "./TimeSlot.module.css";

class TimeSlot extends Component {
  render() {
    const {
      props: { reservationStart, reservationEnd },
    } = this;

    return (
      <React.Fragment>
        <button>
          {reservationStart} - {reservationEnd}
        </button>
      </React.Fragment>
    );
  }
}

export default TimeSlot;

import React, { Component } from "react";
import styles from "./TimeSlot.module.css";

class TimeSlot extends Component {
  render() {
    const {
      props: { reservationSlotStart, reservationSlotEnd },
    } = this;

    return (
      <React.Fragment>
        <button>
          {reservationSlotStart} - {reservationSlotEnd}
        </button>
      </React.Fragment>
    );
  }
}

export default TimeSlot;

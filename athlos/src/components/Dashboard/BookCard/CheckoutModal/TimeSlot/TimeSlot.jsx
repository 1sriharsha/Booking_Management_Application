import React, { Component } from "react";
import "./TimeSlot.css";
class TimeSlot extends Component {
  render() {
    const {
      props: {
        reservationID,
        reservationSlotStart,
        reservationSlotEnd,
        setReservedSlot,
        reservedSlot,
      },
    } = this;

    let className = "";

    if (reservedSlot === reservationID) {
      className += "activeTimeSlot";
    }

    return (
      <React.Fragment>
        <button
          onClick={() => setReservedSlot(reservationID)}
          className={className}
        >
          {reservationSlotStart + ":00"} - {reservationSlotEnd + ":00"}
        </button>
      </React.Fragment>
    );
  }
}

export default TimeSlot;

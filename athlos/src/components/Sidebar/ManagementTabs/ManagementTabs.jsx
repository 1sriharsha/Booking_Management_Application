import React, { Component } from "react";
import styles from "./ManagementTabs.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ManagementTabs extends Component {
  render() {
    return (
      <React.Fragment>
        {/* Management Section */}
        <div className={styles.managementView}>
          <div className={styles.title}>MANAGEMENT</div>
          <button
            className={styles.sideTabLink}
            onclick="openSideTab('editBookings')"
          >
            <i>
              <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
            </i>
            Edit Bookings
          </button>
          <button
            className={styles.sideTabLink}
            onclick="openSideTab('editEquipment')"
          >
            <i>
              <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
            </i>
            Edit Equipment
          </button>
          <button
            className={styles.sideTabLink}
            onclick="openSideTab('promotions')"
          >
            <i>
              <FontAwesomeIcon icon="fa-solid fa-receipt" />
            </i>
            Edit Promotions
          </button>
          <button className={styles.sideTabLink} onclick="openSideTab('chat')">
            <i>
              <FontAwesomeIcon icon="fa-solid fa-headset" />
            </i>
            Chat Support
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default ManagementTabs;

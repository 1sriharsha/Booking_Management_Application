import React, { Component } from "react";
import styles from "./UserTabs.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class UserTabs extends Component {
  render() {
    return (
      <React.Fragment>
        {/* Dashboard Section */}
        <button
          className={[styles.sideTabLink, styles.activeTablink].join(" ")}
          id="tab-dashboard"
          onclick="openSideTab('dashboard')"
        >
          <i>
            <FontAwesomeIcon icon="fa-solid fa-house-user" />
          </i>
          Dashboard
        </button>

        {/* Bookings Section */}
        <div className={styles.title}>BOOKINGS</div>
        <button
          className={styles.sideTabLink}
          id="tab-book"
          onclick="openSideTab('book')"
        >
          <i>
            <FontAwesomeIcon icon="fa-solid fa-bookmark" />
          </i>
          Book
        </button>
        <button
          className={styles.sideTabLink}
          id="tab-myBookings"
          onclick="openSideTab('myBookings')"
        >
          <i>
            <FontAwesomeIcon icon="fa-solid fa-layer-group" />
          </i>
          My Bookings
        </button>

        {/* Account Section */}
        <div className={styles.accountView}>
          <div className={styles.title}>ACCOUNT</div>
          <button
            className={styles.sideTabLink}
            id="tab-notifications"
            onclick="openSideTab('notifications')"
          >
            <i>
              <FontAwesomeIcon icon="fa-solid fa-bell" />
            </i>
            Notifications
          </button>
          <button
            className={styles.sideTabLink}
            id="tab-settings"
            onclick="openSideTab('settings')"
          >
            <i>
              <FontAwesomeIcon icon="fa-solid fa-gears" />
            </i>
            Settings
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default UserTabs;

import React, { Component } from "react";
import styles from "./ManagementTabs.module.css";
import { Tab } from "../../..";
class ManagementTabs extends Component {
  render() {
    return (
      <React.Fragment>
        {/* Management Section */}
        <div className={styles.title}>MANAGEMENT</div>

        <Tab
          activeTab={this.props.activeTab}
          onClick={this.props.onClick}
          tabLabel="Edit Bookings"
          icon="fa-solid fa-pen-to-square"
        ></Tab>
        <Tab
          activeTab={this.props.activeTab}
          onClick={this.props.onClick}
          tabLabel="Edit Equipment"
          icon="fa-solid fa-pen-to-square"
        ></Tab>
        <Tab
          activeTab={this.props.activeTab}
          onClick={this.props.onClick}
          tabLabel="Edit Promotions"
          icon="fa-solid fa-receipt"
        ></Tab>
        <Tab
          activeTab={this.props.activeTab}
          onClick={this.props.onClick}
          tabLabel="Chat Support"
          icon="fa-solid fa-headset"
        ></Tab>

        {/* <div className={styles.managementView}>
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
        </div> */}
      </React.Fragment>
    );
  }
}

export default ManagementTabs;

import React, { Component } from "react";
import styles from "./UserTabs.module.css";
import { Tab } from "../../..";

class UserTabs extends Component {
  render() {
    return (
      <React.Fragment>
        {/* Dashboard Section */}
        <Tab
          activeTab={this.props.activeTab}
          onClick={this.props.onClick}
          tabLabel="Dashboard"
          icon="fa-solid fa-house-user"
        ></Tab>

        {/* Bookings Section */}
        <div className={styles.title}>BOOKINGS</div>
        <Tab
          activeTab={this.props.activeTab}
          onClick={this.props.onClick}
          tabLabel="Book"
          icon="fa-solid fa-bookmark"
        ></Tab>
        <Tab
          activeTab={this.props.activeTab}
          onClick={this.props.onClick}
          tabLabel="My Bookings"
          icon="fa-solid fa-layer-group"
        ></Tab>

        {/* Account Section */}
        <div className={styles.title}>ACCOUNT</div>
        <Tab
          activeTab={this.props.activeTab}
          onClick={this.props.onClick}
          tabLabel="Notifications"
          icon="fa-solid fa-bell"
        ></Tab>
        <Tab
          activeTab={this.props.activeTab}
          onClick={this.props.onClick}
          tabLabel="Settings"
          icon="fa-solid fa-gears"
        ></Tab>
      </React.Fragment>
    );
  }
}

export default UserTabs;

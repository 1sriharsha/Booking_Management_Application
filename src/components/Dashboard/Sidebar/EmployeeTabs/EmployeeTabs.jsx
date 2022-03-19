import React, { Component } from "react";
import styles from "./EmployeeTabs.module.css";
import { Tab } from "../../..";

class EmployeeTabs extends Component {
  render() {
    return (
      <React.Fragment>
        {/* Bookings Section */}
        <div className={styles.title}>BOOKINGS</div>
        <Tab
          activeTab={this.props.activeTab}
          onClick={this.props.onClick}
          tabLabel="Book"
          icon="fa-solid fa-bookmark"
        ></Tab>
      </React.Fragment>
    );
  }
}

export default EmployeeTabs;

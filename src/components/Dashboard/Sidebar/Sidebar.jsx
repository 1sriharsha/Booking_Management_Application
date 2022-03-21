import React, { Component } from "react";
import styles from "./Sidebar.module.css";
import UserTabs from "./UserTabs/UserTabs";
import ManagementTabs from "./ManagementTabs/ManagementTabs";
import GuestTabs from "./GuestTabs/GuestTabs";
import EmployeeTabs from "./EmployeeTabs/EmployeeTabs";

class Sidebar extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={styles.sidebar}>
          {/* Athlos Branding */}
          <div className={styles.logo}>
            <a href="/">Athlos</a>
          </div>

          {/* Guest View Tabs */}
          {this.props.userType === "guest" && (
            <GuestTabs
              activeTab={this.props.activeTab}
              onClick={this.props.onClick}
            />
          )}

          {/* Customer View Tabs */}
          {this.props.userType === "customer" && (
            <UserTabs
              activeTab={this.props.activeTab}
              onClick={this.props.onClick}
            />
          )}

          {/* Manager View Tabs */}
          {this.props.userType === "manager" && (
            <ManagementTabs
              activeTab={this.props.activeTab}
              onClick={this.props.onClick}
            />
          )}

          {/* On-Site Employee View Tabs */}
          {this.props.userType === "employee" && (
            <EmployeeTabs
              activeTab={this.props.activeTab}
              onClick={this.props.onClick}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Sidebar;

import React, { Component } from "react";
import styles from "./Sidebar.module.css";
import UserTabs from "./UserTabs/UserTabs";
import ManagementTabs from "./ManagementTabs/ManagementTabs";

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className={styles.sidebar}>
          {/* Athlos Branding */}
          <div className={styles.logo}>
            <a href="/">Athlos</a>
          </div>

          {/* Customer View Tabs */}
          {this.props.userType == "Customer" && (
            <UserTabs
              activeTab={this.props.activeTab}
              onClick={this.props.onClick}
              tabLabel={this.props.tabLabel}
            />
          )}

          {/* Manager View Tabs */}
          {this.props.userType == "Manager" && (
            <ManagementTabs
              activeTab={this.props.activeTab}
              tabLabel={this.props.tabLabel}
              onClick={this.props.onClick}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Sidebar;

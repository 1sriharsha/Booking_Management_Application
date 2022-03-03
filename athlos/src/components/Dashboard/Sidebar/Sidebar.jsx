import React, { Component } from "react";
import styles from "./Sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserTabs from "./UserTabs/UserTabs";
import ManagementTabs from "./ManagementTabs/ManagementTabs";

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          {/* Sidebar: Athlos Branding [Top] */}
          <div className={styles.logo}>
            <a href="/">Athlos</a>
          </div>

          {this.props.userType == "Customer" && (
            <UserTabs
              activeTab={this.props.activeTab}
              onClick={this.props.onClick}
              tabLabel={this.props.tabLabel}
            />
          )}
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

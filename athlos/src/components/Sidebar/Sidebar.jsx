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

          {this.props.userType == "Customer" && <UserTabs />}
          {this.props.userType == "Manager" && <ManagementTabs />}
        </div>
      </React.Fragment>
    );
  }
}

export default Sidebar;

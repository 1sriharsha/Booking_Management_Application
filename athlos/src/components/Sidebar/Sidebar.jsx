import React, { Component } from "react";
import styles from "./Sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserTabs from "./UserTabs/UserTabs";
import ManagementTabs from "./ManagementTabs/ManagementTabs";

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isUser: true,
    isManagement: false,
  };

  render() {
    return (
      <React.Fragment>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          {/* Sidebar: Athlos Branding [Top] */}
          <div className={styles.logo}>
            <a href="/">Athlos</a>
          </div>

          {this.state.isUser && <UserTabs />}
          {this.state.isManagement && <ManagementTabs />}
        </div>
      </React.Fragment>
    );
  }
}

export default Sidebar;

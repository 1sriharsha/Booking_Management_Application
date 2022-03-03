import React, { Component } from "react";
import styles from "./Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Sidebar, Tabs } from "..";
import NavProfile from "../NavProfile/NavProfile";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilters: false,
      activeTab: "Dashboard",
      tabLabel: "err",
    };
  }

  toggleFilters() {
    if (this.state.showFilters) {
      this.setState({ showFilters: false });
    } else {
      this.setState({ showFilters: true });
    }
  }

  onClickTabItem = (tab) => {
    console.log("Previous Active Tab: " + this.state.activeTab);
    console.log("Previous Tab Label: " + this.state.tabLabel);
    this.setState({ activeTab: tab });
    console.log("New Active Tab: " + this.state.activeTab);
    console.log("New Tab Label: " + this.state.tabLabel);
  };

  render() {
    return (
      <>
        {/* Top Navigation Bar */}
        <header className={styles.topnav}>
          <div className={styles.container}>
            <div className={styles.navigation}>
              {/* Navigation: Search Bar [Middle] */}
              <div className={styles.menu}>
                <div className={styles.search}>
                  <input type="search" placeholder="Search Bookings..." />
                  <button
                    className={styles.filter}
                    onClick={() => this.toggleFilters()}
                  >
                    <i>
                      <FontAwesomeIcon icon="fa-solid fa-filter" />
                    </i>
                  </button>
                  {this.state.showFilters ? (
                    <div className={styles.filterOptions} id="filter-toggle">
                      <div>Option 1</div>
                      <div>Option 2</div>
                      <div>Option 3</div>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Navigation: User Login/Sign Up Buttons [Right] */}
              <NavProfile
                isAuthenticated={this.props.isAuthenticated}
                userFirstName={this.props.userFirstName}
                userLastName={this.props.userLastName}
                onShowModal={this.props.onShowModal}
              />
            </div>
          </div>
        </header>

        <Sidebar
          userType={this.props.userType}
          activeTab={this.state.activeTab}
          tabLabel={this.state.tabLabel}
          onClick={this.onClickTabItem}
        />
      </>
    );
  }
}

export default Dashboard;

import React, { Component } from "react";
import styles from "./Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Sidebar } from "..";
import NavProfile from "../NavProfile/NavProfile";

class Dashboard extends Component {
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
                    onclick="toggleVisibility('filter-toggle')"
                  >
                    <i>
                      <FontAwesomeIcon icon="fa-solid fa-filter" />
                    </i>
                  </button>
                  <div className={styles.filterOptions} id="filter-toggle">
                    <div>Option 1</div>
                    <div>Option 2</div>
                    <div>Option 3</div>
                  </div>
                </div>
              </div>

              {/* Navigation: User Login/Sign Up Buttons [Right] */}
              <NavProfile />
            </div>
          </div>
        </header>

        <Sidebar />
      </>
    );
  }
}

export default Dashboard;

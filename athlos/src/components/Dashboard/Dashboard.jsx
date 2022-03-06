import React, { Component } from "react";
import styles from "./Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BookCard, Sidebar } from "..";
import NavProfile from "../NavProfile/NavProfile";
import Shortcut from "./Shortcut/Shortcut";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilters: false,
      activeTab: "Dashboard", // Default to Dashboard
    };
  }

  toggleFilters() {
    this.setState({ showFilters: !this.state.showFilters });
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  };

  // Open "Book" tab when user types in search bar
  onSearchChange = () => {
    this.onClickTabItem("Book");
  };

  render() {
    const facilities = [
      {
        id: 1,
        facilityName: "Student Recreational Sports Center",
        facilityLocation: "Bloomington, IN",
        facilitySport: "Soccer",
        availableNow: true,
      },
      {
        id: 2,
        facilityName: "Student Recreational Sports Center",
        facilityLocation: "Bloomington, IN",
        facilitySport: "Basketball",
        availableNow: false,
      },
      {
        id: 3,
        facilityName: "Student Recreational Sports Center",
        facilityLocation: "Bloomington, IN",
        facilitySport: "Volleyball",
        availableNow: false,
      },
      {
        id: 4,
        facilityName: "Student Recreational Sports Center",
        facilityLocation: "Bloomington, IN",
        facilitySport: "TableTennis",
        availableNow: false,
      },
      {
        id: 5,
        facilityName: "Student Recreational Sports Center",
        facilityLocation: "Bloomington, IN",
        facilitySport: "Squash",
        availableNow: true,
      },
      {
        id: 6,
        facilityName: "Student Recreational Sports Center",
        facilityLocation: "Bloomington, IN",
        facilitySport: "Badminton",
        availableNow: false,
      },
    ];

    var i = 0;
    var animationDelay = 0;
    // Generates n BookCard components from Database
    const nBookCards = facilities.map(
      ({ id, facilityName, facilityLocation, facilitySport, availableNow }) => {
        if (i >= 3) {
          animationDelay += 0.05;
          i = 0;
        }
        i += 1;

        return (
          <React.Fragment>
            <BookCard
              key={id}
              facilityID={id}
              facilityName={facilityName}
              facilityLocation={facilityLocation}
              facilitySport={facilitySport}
              availableNow={availableNow}
              animationDelay={animationDelay}
            />
          </React.Fragment>
        );
      }
    );

    return (
      <React.Fragment>
        {/* Top Navigation Bar */}
        <header className={styles.topnav}>
          <div className={styles.container}>
            <div className={styles.navigation}>
              {/* Navigation: Search Bar [Middle] */}
              <div className={styles.menu}>
                <div className={styles.search}>
                  <input
                    id="searchBar"
                    type="search"
                    placeholder="Search Bookings..."
                    onChange={this.onSearchChange}
                  />
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
                onLogout={this.props.onLogout}
              />
            </div>
          </div>
        </header>

        {/* Side Navigation Bar */}
        <Sidebar
          userType={this.props.userType}
          activeTab={this.state.activeTab}
          onClick={this.onClickTabItem}
        />

        {/* Tab Content */}
        <div className={styles.tabContainer}>
          {/* Dashboard Content */}

          {this.state.activeTab === "Dashboard" && (
            <React.Fragment>
              {/* Data Visualization */}
              <section className={styles.dataVisualContainer}></section>

              {/* Shortcuts */}
              <div className={styles.shortcutContainer}>
                <Shortcut
                  shortcutTo="Book"
                  title="Book"
                  description="Book A Facility"
                  icon="fa-solid fa-bookmark"
                  iconClass="icon iconBlue"
                  onClick={this.onClickTabItem}
                />
                <Shortcut
                  shortcutTo="My Bookings"
                  title="Bookings"
                  description="My Bookings"
                  icon="fa-solid fa-layer-group"
                  iconClass="icon iconPurple"
                  onClick={this.onClickTabItem}
                />
                <Shortcut
                  shortcutTo="Notifications"
                  title="Notifications"
                  description="My Notifications"
                  icon="fa-solid fa-bell"
                  iconClass="icon iconOrange"
                  onClick={this.onClickTabItem}
                />
              </div>
            </React.Fragment>
          )}
          {/* Book Content */}
          {this.state.activeTab === "Book" && (
            <div className={styles.bookContainer}>{nBookCards}</div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;

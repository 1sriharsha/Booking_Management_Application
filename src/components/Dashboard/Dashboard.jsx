import React, { Component } from "react";
import styles from "./Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BookCard, Sidebar } from "..";
import NavProfile from "../NavProfile/NavProfile";
import Shortcut from "./Shortcut/Shortcut";
import { FacilityData } from "../../data/";
import EditCard from "./EditCard/EditCard";
import AddCard from "./AddCard/AddCard";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    // Set default tab by user type
    let defaultTab = "Book";
    if (props.userType === "customer") {
      defaultTab = "Dashboard";
    } else if (props.userType === "manager") {
      defaultTab = "Edit Bookings";
    }

    this.state = {
      showFilters: false,
      activeTab: defaultTab,
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
    if (this.props.userType === "manager") {
      this.onClickTabItem("Edit Bookings");
    } else {
      this.onClickTabItem("Book");
    }
  };

  render() {
    var i = 0;
    var animationDelay = 0;
    // Generates n BookCard components from Database
    const nBookCards = FacilityData.map(
      ({
        id,
        facilityName,
        facilityLocation,
        facilitySport,
        facilityInfo,
        availableNow,
        reservationPeriodStart,
        reservationPeriodEnd,
      }) => {
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
              facilityInfo={facilityInfo}
              availableNow={availableNow}
              animationDelay={animationDelay}
              reservationPeriodStart={reservationPeriodStart}
              reservationPeriodEnd={reservationPeriodEnd}
              isAuthenticated={this.props.isAuthenticated}
              onShowModal={this.props.onShowModal}
            />
          </React.Fragment>
        );
      }
    );

    // Generates n EditCard components from Database
    const nEditCards = FacilityData.map(
      ({
        id,
        facilityName,
        facilityLocation,
        facilitySport,
        facilityInfo,
        availableNow,
        reservationPeriodStart,
        reservationPeriodEnd,
      }) => {
        if (i >= 3) {
          animationDelay += 0.05;
          i = 0;
        }
        i += 1;

        return (
          <React.Fragment>
            <EditCard
              key={id}
              facilityID={id}
              facilityName={facilityName}
              facilityLocation={facilityLocation}
              facilitySport={facilitySport}
              facilityInfo={facilityInfo}
              availableNow={availableNow}
              animationDelay={animationDelay}
              reservationPeriodStart={reservationPeriodStart}
              reservationPeriodEnd={reservationPeriodEnd}
              isAuthenticated={this.props.isAuthenticated}
              onShowModal={this.props.onShowModal}
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

          {/* Edit Bookings */}
          {this.state.activeTab === "Edit Bookings" && (
            <div className={styles.bookContainer}>
              <AddCard animationDelay={animationDelay} />
              {nEditCards}
              {/* <EditCard
                key={1}
                facilityID={1}
                facilityName={"SRSC"}
                facilityLocation={"Bloomington"}
                facilitySport={"Soccer"}
                facilityInfo={"Soccer Field #00"}
                availableNow={true}
                animationDelay={animationDelay}
                reservationPeriodStart={6}
                reservationPeriodEnd={8}
                isAuthenticated={this.props.isAuthenticated}
                onShowModal={this.props.onShowModal}
              /> */}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;

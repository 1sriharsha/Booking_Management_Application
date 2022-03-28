import React, { Component } from "react";
import styles from "./Searchbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FacilityData } from "../../../data";
import uniqid from "uniqid";
import SportFilter from "./SportFilter/SportFilter";

// Array of Facility Locations
const locations = FacilityData.map(({ facilityLocation }) => {
  return facilityLocation;
});

// Set of Unique Locations
const uniqueLocations = [...new Set(locations)];

class Searchbar extends Component {
  state = {
    showOptions: false,
    searchValue: "",
  };

  // Open "Book" tab when user types in search bar
  onSearchChange = (e) => {
    let searchValue = e.target.value;

    if (this.props.userType === "Manager") {
      this.props.onClickTabItem("Edit Bookings");
    } else {
      this.props.onClickTabItem("Book");
    }

    this.props.handleSearchValue(searchValue);
    this.setState({ searchValue: searchValue });
  };

  setSearchValue = (value) => {
    this.props.handleSearchValue(value);
    this.setState({ searchValue: value, showOptions: false });
  };

  onResetSearch = () => {
    this.setState({ showOptions: false, searchValue: "" });
    this.props.onResetSearch();
  };

  render() {
    // Filter Unique Locations by Search Value
    let filteredLocations = uniqueLocations.filter((uniqueLocation) =>
      uniqueLocation
        .toLowerCase()
        .includes(this.state.searchValue.toLowerCase())
    );

    // Map Unique Locations to buttons
    const nOptions = filteredLocations.map((facilityLocation) => {
      return (
        <button
          key={uniqid("", "-option")}
          onClick={() => this.setSearchValue(facilityLocation)}
          className={styles.listOptions}
        >
          {facilityLocation}
        </button>
      );
    });

    return (
      <React.Fragment>
        <div className={styles.search}>
          <div>
            <input
              value={this.state.searchValue}
              onFocus={() => this.setState({ showOptions: true })}
              // TODO Fix Close onBlur
              // onBlur={() => this.setState({ showOptions: false })}
              id="searchBar"
              type="search"
              placeholder="Search Bookings..."
              onChange={(e) => this.onSearchChange(e)}
            />
            <button
              className={styles.clear}
              onClick={this.onResetSearch}
              title="Reset Search"
            >
              <FontAwesomeIcon icon={"fa-solid fa-circle-xmark"} />
            </button>
          </div>

          {/* Autocomplete Options */}
          {this.state.showOptions && (
            <main className={styles.searchDropdown}>
              <section className={styles.searchOptions}>{nOptions}</section>
              <section className={styles.filterOptions}>
                <SportFilter
                  handleSportFilter={this.props.handleSportFilter}
                  sportFilterValue={this.props.sportFilterValue}
                />
              </section>
            </main>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Searchbar;

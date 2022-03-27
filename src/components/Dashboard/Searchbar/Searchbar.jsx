import React, { Component } from "react";
import styles from "./Searchbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FacilityData } from "../../../data";
import uniqid from "uniqid";

// Array of Facility Locations
const locations = FacilityData.map(({ facilityLocation }) => {
  return facilityLocation;
});

// Set of Unique Locations
const uniqueLocations = [...new Set(locations)];

class Searchbar extends Component {
  state = {
    showFilters: false,
    showOptions: false,
    searchValue: "",
  };

  toggleFilters() {
    this.setState({ showFilters: !this.state.showFilters });
  }

  // Open "Book" tab when user types in search bar
  onSearchChange = (e) => {
    let searchValue = e.target.value;

    if (this.props.userType === "manager") {
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
              className={styles.filter}
              onClick={() => this.toggleFilters()}
            >
              <i>
                <FontAwesomeIcon icon="fa-solid fa-filter" />
              </i>
            </button>
            {/* TODO Add filter functionality */}
            {this.state.showFilters ? (
              <div className={styles.filterOptions} id="filter-toggle">
                <div>Time</div>
                <div>Sports</div>
              </div>
            ) : null}
          </div>

          {/* Autocomplete Options */}
          {this.state.showOptions && (
            <div className={styles.searchOptions}>{nOptions}</div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Searchbar;

import React, { Component } from "react";
import styles from "./Searchbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FacilityData } from "../../../data";

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
    if (this.props.userType === "manager") {
      this.props.onClickTabItem("Edit Bookings");
    } else {
      this.props.onClickTabItem("Book");
    }

    this.setState({ searchValue: e.target.value });
  };

  setSearchValue(value) {
    this.setState({ searchValue: value });
  }

  render() {
    // Mapping function to loop through the Facility Data
    const nOptions = FacilityData.map(({ id, facilityLocation }) => {
      return (
        <button
          onClick={() => this.setSearchValue(facilityLocation)}
          className={styles.listOptions}
          key={id}
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
            {this.state.showFilters ? (
              <div className={styles.filterOptions} id="filter-toggle">
                <div>Time</div>
                <div>Sports</div>
              </div>
            ) : null}
          </div>
          {this.state.showOptions && (
            <div className={styles.searchOptions}>{nOptions}</div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Searchbar;

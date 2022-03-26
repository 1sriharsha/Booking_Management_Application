import React, { Component } from "react";
import styles from "./Searchbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Searchbar extends Component {
  state = {
    showFilters: false,
  };

  toggleFilters() {
    this.setState({ showFilters: !this.state.showFilters });
  }

  // Open "Book" tab when user types in search bar
  onSearchChange = () => {
    if (this.props.userType === "manager") {
      this.props.onClickTabItem("Edit Bookings");
    } else {
      this.props.onClickTabItem("Book");
    }
  };

  render() {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

export default Searchbar;

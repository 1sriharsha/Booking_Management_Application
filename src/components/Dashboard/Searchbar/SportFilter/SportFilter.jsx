import React, { Component } from "react";
import styles from "./SportFilter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SupportedSports } from "../../../../data";
import uniqid from "uniqid";

class SportFilter extends Component {
  state = { showSportFilters: false };

  toggleSportFilters = () => {
    this.setState({ showSportFilters: !this.state.showSportFilters });
  };

  setFilter = (value) => {
    this.setState({ showSportFilters: false });
    this.props.handleSportFilter(value);
  };

  render() {
    const nSportOptions = SupportedSports.map(({ sportName }) => {
      return (
        <button
          key={uniqid("", "-filter")}
          onClick={() => this.setFilter(sportName)}
        >
          {sportName}
        </button>
      );
    });

    return (
      <div className={styles.sportFilter}>
        <button onClick={this.toggleSportFilters} title="Filter by Sport">
          <i>
            <FontAwesomeIcon icon="fa-solid fa-futbol" />
          </i>
        </button>
        {this.state.showSportFilters && (
          <div className={styles.sportOptions}>
            <button
              className={styles.close}
              onClick={() => {
                this.setState({ showSportFilters: false });
                this.setFilter("");
              }}
            >
              <i>
                <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
              </i>
            </button>
            {nSportOptions}
          </div>
        )}
      </div>
    );
  }
}

export default SportFilter;

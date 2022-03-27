import React, { Component } from "react";
import styles from "./SportFilter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SportFilter extends Component {
  state = {};
  render() {
    return (
      <div className={styles.sportFilter}>
        <button onClick={this.toggleSportFilters} title="Filter by Sport">
          <i>
            <FontAwesomeIcon icon="fa-solid fa-futbol" />
          </i>
        </button>
        {this.state.showSportFilters && (
          <div className={styles.sportOptions}>Soccer</div>
        )}
      </div>
    );
  }
}

export default SportFilter;

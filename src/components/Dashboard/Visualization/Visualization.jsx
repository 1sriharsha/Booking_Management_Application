import React, { Component } from "react";
import styles from "./Visualization.module.css";
import EarningsGraph from "./EarningsGraph/EarningsGraph";
import FavoriteSportsGraph from "./FavoriteSportsGraph/FavoriteSportsGraph";

class Visualization extends Component {
  render() {
    return (
      <React.Fragment>
        <section className={styles.container}>
          {this.props.userType === "Manager" && <EarningsGraph />}
          {this.props.userType === "Customer" && <FavoriteSportsGraph />}
        </section>

        {this.props.userType === "Customer" && (
          <React.Fragment></React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Visualization;

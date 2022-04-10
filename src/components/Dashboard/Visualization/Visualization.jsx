import React, { Component } from "react";
import styles from "./Visualization.module.css";
import {
  VictoryAxis,
  VictoryBrushContainer,
  VictoryChart,
  VictoryLine,
  VictoryZoomContainer,
} from "victory";
import EarningsGraph from "./EarningsGraph/EarningsGraph";
import FavoriteSportsGraph from "./FavoriteSportsGraph/FavoriteSportsGraph";

const earningsData = [
  { x: new Date(2022, 0, 1), y: 42.79 },
  { x: new Date(2022, 1, 1), y: 150.19 },
  { x: new Date(2022, 2, 1), y: 382.71 },
  { x: new Date(2022, 3, 1), y: 559.39 },
];

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

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
        {this.props.userType === "Manager" && (
          <section className={styles.container}>
            <EarningsGraph />
          </section>
        )}
      </React.Fragment>
    );
  }
}

export default Visualization;

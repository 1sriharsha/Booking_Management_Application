import React, { Component } from "react";
import styles from "./Visualization.module.css";
import {
  VictoryAxis,
  VictoryBrushContainer,
  VictoryChart,
  VictoryLine,
  VictoryZoomContainer,
} from "victory";

const earningsData = [
  { x: new Date(2022, 0, 1), y: 42.79 },
  { x: new Date(2022, 1, 1), y: 150.19 },
  { x: new Date(2022, 2, 1), y: 382.71 },
  { x: new Date(2022, 3, 1), y: 559.39 },
];

class Visualization extends Component {
  state = {};

  handleZoom(domain) {
    this.setState({ selectedDomain: domain });
  }

  handleBrush(domain) {
    this.setState({ zoomDomain: domain });
  }

  render() {
    return (
      <React.Fragment>
        {this.props.userType === "Manager" && (
          <section className={styles.container}>
            {/* Earnings Data */}
            <h1 className={styles.title}>Athlos Earnings</h1>
            <VictoryChart
              width={1130}
              height={450}
              scale={{ x: "time" }}
              containerComponent={
                <VictoryZoomContainer
                  responsive={false}
                  zoomDimension="x"
                  zoomDomain={this.state.zoomDomain}
                  onZoomDomainChange={this.handleZoom.bind(this)}
                />
              }
            >
              {/* Primary Graph */}
              <VictoryAxis dependentAxis tickFormat={(x) => `$${x}`} />
              <VictoryAxis crossAxis />
              <VictoryLine
                style={{
                  data: { stroke: "tomato" },
                }}
                data={earningsData}
              />
            </VictoryChart>

            <VictoryChart
              width={550}
              height={90}
              scale={{ x: "time" }}
              padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
              containerComponent={
                <VictoryBrushContainer
                  responsive={false}
                  brushDimension="x"
                  brushDomain={this.state.selectedDomain}
                  onBrushDomainChange={this.handleBrush.bind(this)}
                />
              }
            >
              <VictoryAxis
                tickValues={[
                  new Date(2022, 0, 1),
                  new Date(2022, 1, 1),
                  new Date(2022, 2, 1),
                  new Date(2022, 3, 1),
                ]}
                tickFormat={(x) => new Date(x).getMonth()}
              />
              {/* Secondary Graph */}
              <VictoryLine
                style={{
                  data: { stroke: "tomato" },
                }}
                data={earningsData}
              />
            </VictoryChart>
          </section>
        )}
      </React.Fragment>
    );
  }
}

export default Visualization;

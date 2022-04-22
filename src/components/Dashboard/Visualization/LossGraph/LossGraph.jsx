import React, { Component } from "react";
import styles from "./LossGraph.module.css";
import {
  VictoryAxis,
  VictoryBrushContainer,
  VictoryChart,
  VictoryLine,
  VictoryZoomContainer,
} from "victory";

const lossData = [
  { x: new Date(2022, 0, 1), y: 2.74 },
  { x: new Date(2022, 0, 15), y: 4.01 },
  { x: new Date(2022, 1, 1), y: 12.29 },
  { x: new Date(2022, 1, 15), y: 13.94 },
  { x: new Date(2022, 2, 1), y: 27.42 },
  { x: new Date(2022, 2, 15), y: 23.55 },
  { x: new Date(2022, 3, 1), y: 20.98 },
  { x: new Date(2022, 3, 15), y: 21.32 },
];

class LossGraph extends Component {
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
        {/* Loss Data */}
        <h1 className={styles.title}>Athlos Losses</h1>
        <VictoryChart
          width={1130}
          height={450}
          padding={80}
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
            data={lossData}
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
            data={lossData}
          />
        </VictoryChart>
      </React.Fragment>
    );
  }
}

export default LossGraph;

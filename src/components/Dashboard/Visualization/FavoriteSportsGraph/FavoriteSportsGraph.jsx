import React, { Component } from "react";
import styles from "./FavoriteSportsGraph.module.css";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory";

const favoritesData = [
  { sport: "Soccer", totalBookings: 7 },
  { sport: "Basketball", totalBookings: 3 },
  { sport: "Volleyball", totalBookings: 1 },
];

class FavoriteSportsGraph extends Component {
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
        {/* Earnings Data */}
        <h1 className={styles.title}>Your Favorite Sports</h1>
        <VictoryChart width={1000} height={450} theme={VictoryTheme.material}>
          <VictoryAxis label={"Sport"} tickFormat={(t) => ``} />
          <VictoryAxis
            dependentAxis
            label={"# of Bookings"}
            tickFormat={(t) => `${t}`}
          />
          <VictoryBar
            horizontal
            data={favoritesData}
            labels={({ datum }) => `${datum.sport}`}
            x="sport"
            y="totalBookings"
            alignment="start"
            barRatio={0.2}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
          />
        </VictoryChart>
      </React.Fragment>
    );
  }
}

export default FavoriteSportsGraph;

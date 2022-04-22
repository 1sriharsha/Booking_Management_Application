import React, { Component } from "react";
import styles from "./Visualization.module.css";
import EarningsGraph from "./EarningsGraph/EarningsGraph";
import FavoriteSportsGraph from "./FavoriteSportsGraph/FavoriteSportsGraph";
import LossGraph from "./LossGraph/LossGraph";
import SalesGraph from "./SalesGraph/SalesGraph";
import ExpensesGraph from "./ExpensesGraph/ExpensesGraph";

class Visualization extends Component {
  render() {
    return (
      <React.Fragment>
        <section className={styles.container}>
          {/* [Manager] Earnings Graph */}
          {this.props.userType === "Manager" && <EarningsGraph />}

          {/* [Manager] Loss Graph */}
          {this.props.userType === "Manager" && <LossGraph />}

          {/* [Manager] Sales Graph */}
          {this.props.userType === "Manager" && <SalesGraph />}

          {/* [Manager] Expenses Graph */}
          {this.props.userType === "Manager" && <ExpensesGraph />}

          {/* [Customer] Favorite Sports Graph */}
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

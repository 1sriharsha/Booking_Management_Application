import React, { Component } from "react";
import Counter from "../Counter/Counter";

class Counters extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.counters.map((counters) => (
          <Counter
            key={counters.id}
            onIncrement={this.props.onIncrement}
            onDecrement={this.props.onDecrement}
            counter={counters}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default Counters;

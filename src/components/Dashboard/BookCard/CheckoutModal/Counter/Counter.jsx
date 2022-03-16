import React, { Component } from "react";
import styles from "./Counter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NumberFormat from "react-number-format";
class Counter extends Component {
  state = {
    itemCount: 0,
  };

  onIncrement = () => {
    if (this.state.itemCount < this.props.maxItems) {
      this.setState({ itemCount: this.state.itemCount + 1 });
    }
  };

  onDecrement = () => {
    if (this.state.itemCount > 0) {
      this.setState({ itemCount: this.state.itemCount - 1 });
    }
  };

  render() {
    const {
      props: { itemName, itemPrice },
    } = this;

    return (
      <React.Fragment>
        <section className={styles.counterContainer}>
          <div className={styles.label}>{itemName}</div>
          <div className={styles.counter}>
            <div>{this.state.itemCount}</div>
            <div>
              <button onClick={this.onIncrement}>
                <FontAwesomeIcon icon="fa-solid fa-plus" />
              </button>
              <button onClick={this.onDecrement}>
                <FontAwesomeIcon icon="fa-solid fa-minus" />
              </button>
            </div>
          </div>
          <div className={styles.price}>
            <NumberFormat
              prefix={"$"}
              value={(itemPrice * this.state.itemCount).toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
            />
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Counter;

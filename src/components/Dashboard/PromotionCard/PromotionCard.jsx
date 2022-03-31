import React, { Component } from "react";
import styles from "./PromotionCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PromotionCard extends Component {
  state = {
    showCheckoutModal: false,
    buttonLabel: "Copy Code",
  };

  render() {
    const {
      props: {
        promotionName,
        promotionCode,
        promotionStart,
        promotionEnd,
        promotionInfo,
        animationDelay,
      },
    } = this;

    let promotionLabel = promotionName;
    const maxLabelLength = 35;
    if (promotionLabel.length > maxLabelLength) {
      promotionLabel = promotionLabel.substring(0, maxLabelLength) + "...";
    }

    let fadeDelay = { animationDelay: animationDelay + "s" };

    return (
      <React.Fragment>
        <div
          className={[styles.card, styles.loadIn].join(" ")}
          style={fadeDelay}
        >
          <div className={styles.image}>
            <img src="images/promotion.svg" alt="Promotion" />
          </div>
          <div className={styles.content}>
            <div title={promotionName} className={styles.title}>
              {promotionLabel}
            </div>
            <div className={styles.date}>
              <i>
                <FontAwesomeIcon icon="fa-solid fa-calendar-check" />
              </i>
              <span>{promotionStart}</span> - <span>{promotionEnd}</span>
            </div>
            <div className={styles.code}>
              <i>
                <FontAwesomeIcon icon="fa-solid fa-barcode" />
              </i>
              Code: <span>{promotionCode}</span>
            </div>
            <div className={styles.description}>
              <i>
                <FontAwesomeIcon icon="fa-solid fa-circle-info" />
              </i>
              {promotionInfo}
            </div>
            <button
              className={[styles.button, styles.buttonPrimary].join(" ")}
              onClick={() => {
                this.setState({ buttonLabel: "Copied" });
                navigator.clipboard.writeText(promotionCode);
              }}
            >
              {this.state.buttonLabel}
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PromotionCard;

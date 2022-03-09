import React, { Component } from "react";
import styles from "./Shortcut.module.css";
import "./Shortcut.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Shortcut extends Component {
  onClick = () => {
    const { shortcutTo, onClick } = this.props;
    onClick(shortcutTo);
  };

  render() {
    const {
      onClick,
      props: { icon, iconClass, title, description },
    } = this;

    return (
      <React.Fragment>
        <div className={styles.shortcutContainer}>
          <button className={styles.button} onClick={onClick}>
            <div className={styles.text}>
              <div className={styles.title}>{title}</div>
              <div className={styles.subtitle}>{description}</div>
            </div>
            <div className={iconClass}>
              <i>
                <FontAwesomeIcon icon={icon} />
              </i>
            </div>
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Shortcut;

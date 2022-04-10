import React, { Component } from "react";
import styles from "./EditCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class EditCard extends Component {
  state = {
    isDeleted: false,
  };

  onDelete = () => {
    // TODO Delete from Database
    this.setState({ isDeleted: true });
  };

  render() {
    const {
      props: {
        facilityID,
        facilityName,
        facilityLocation,
        facilitySport,
        facilityInfo,
        animationDelay,
      },
    } = this;

    let facilityLabel = facilityName;
    const maxLabelLength = 35;
    if (facilityLabel.length > maxLabelLength) {
      facilityLabel = facilityLabel.substring(0, maxLabelLength) + "...";
    }

    let sportImage =
      "images/" +
      facilitySport.toString().toLowerCase().replace(/ /g, "") +
      ".jpg";
    let fadeDelay = { animationDelay: animationDelay + "s" };

    return (
      <React.Fragment>
        {/* Facility Card */}
        {!this.state.isDeleted && (
          <div
            className={[styles.card, styles.loadIn].join(" ")}
            style={fadeDelay}
          >
            {/* Facility Image */}
            <div className={styles.image}>
              <img src={sportImage} alt={facilitySport} />
            </div>
            <div className={styles.content}>
              <div title={facilityName} className={styles.title}>
                {facilityLabel}
              </div>
              <div className={styles.location}>
                <i>
                  <FontAwesomeIcon icon="fa-solid fa-location-arrow" />
                </i>
                {facilityLocation}
              </div>
              <div className={styles.description}>
                <i>
                  <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                </i>
                {facilityInfo}
              </div>
              {/* Delete Button */}
              <button
                className={[styles.button, styles.deleteButton].join(" ")}
                onClick={this.onDelete}
              >
                Delete
              </button>
              {/* Edit Button */}
              {/* <button
              className={[styles.button, styles.editButton].join(" ")}
              onClick={() => this.onClickBook({ facilityID })}
            >
              Edit
            </button> */}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default EditCard;

import React, { Component } from "react";
import InterestModal from "./InterestModal/InterestModal";

class ShortcutModal extends Component {
  // state = { showModal: false };
  render() {
    console.log(this.props.shortcutTo);
    return (
      <React.Fragment>
        {this.props.shortcutTo === "interests" && (
          <React.Fragment>
            <InterestModal onCloseModal={this.props.onCloseModal} />
          </React.Fragment>
        )}

        {this.props.shortcutTo === "payments" && (
          <React.Fragment>payments</React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default ShortcutModal;

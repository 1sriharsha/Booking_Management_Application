import React, { Component } from "react";
import "./Tab.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Tab extends Component {
  constructor(props) {
    super(props);
  }

  onClick = () => {
    const { tabLabel, onClick } = this.props;
    onClick(tabLabel);
  };
  render() {
    const {
      onClick,
      props: { activeTab, tabLabel },
    } = this;

    let className = "sideTabLink";

    if (this.props.activeTab === this.props.tabLabel) {
      className += " activeTabLink";
    }

    return (
      <button className={className} onClick={onClick}>
        <i>
          <FontAwesomeIcon icon={this.props.icon} />
        </i>
        {this.props.tabLabel}
      </button>
    );
  }
}

export default Tab;

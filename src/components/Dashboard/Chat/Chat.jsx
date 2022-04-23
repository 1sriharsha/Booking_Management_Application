import React, { Component } from "react";
import Agent from "./Agent/Agent";
import Client from "./Client/Client";

class Chat extends Component {

render() {
    return (
        <React.Fragment>
            {this.props.userType === 'Support' && <Agent />}
            {this.props.userType === 'Customer' && <Client />}
        </React.Fragment>
    )
}

}

export default Chat
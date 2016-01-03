// LICENSE : MIT
"use strict";
import React from "react"
export default class PermanentLink extends React.Component {
    render() {
        return <span className="PermanentLink">
            <a href="javascript:" onClick={this.props.onClick}>{this.props.children}</a>
        </span>
    }
}
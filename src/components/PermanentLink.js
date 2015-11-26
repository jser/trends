// LICENSE : MIT
"use strict";
import React from "react"
export default class PermanentLink extends React.Component {
    render() {
        return <p>
            <a href="javascript:" onClick={this.props.onClick}>Permanent Link</a>
        </p>
    }
}
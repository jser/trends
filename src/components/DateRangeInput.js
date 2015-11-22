// LICENSE : MIT
"use strict";
import React from "react"
import moment from "moment";
export default class DateRangeInput extends React.Component {
    onBegin(evt) {
        this.props.onChangeBegin(evt.target.value);
    }

    onEnd(evt) {
        this.props.onChangeEnd(evt.target.value);
    }

    render() {
        return <div className="DateRangeInput">
            <div>
                開始日: <input type="date" defaultValue={moment(this.props.beginDate).format("YYYY-MM-DD")}
                            onChange={this.onBegin.bind(this)}/>
            </div>
            <div>
                終了日: <input type="date" defaultValue={moment(this.props.endDate).format("YYYY-MM-DD")}
                            onChange={this.onEnd.bind(this)}/>
            </div>
        </div>
    }
}
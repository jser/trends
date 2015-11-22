// LICENSE : MIT
"use strict";
import React from "react"
import {Table} from "reactable"
import moment from "moment";
export default class DataTableView extends React.Component {
    _calc(data) {
        if (!data) {
            return [];
        }
        let keywords = Object.keys(data);
        if (keywords.length === 0) {
            return [];
        }
        let dateKeyList = data[keywords[0]].map(({date}) => date);
        let results = dateKeyList.map(dateKey => {
            let result = {date: moment(dateKey, "YYYY-MM-DD").format("YYYY-MM")};
            keywords.forEach(keyword => {
                let dataList = data[keyword];
                let hitObject = dataList.filter(({date}) => date === dateKey)[0];
                result[keyword] = hitObject.count;
            });
            return result;
        });
        return results;
    }

    render() {
        let data = this._calc(this.props.data);
        return <div className="DataTableView">
            <Table className="table" data={data}/>
        </div>
    }
}
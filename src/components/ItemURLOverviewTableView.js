// LICENSE : MIT
"use strict";
import React from "react"
import {Table,unsafe} from "reactable"
import moment from "moment";
export default class ItemURLOverviewTableView extends React.Component {
    _calc(data) {
        if (!data || !data.length) {
            return [];
        }
        const dataList = data;
        if (dataList.length === 0) {
            return [];
        }
        // yyyy-mm-dd
        const results = dataList.map(({date, totalURL, totalItem}) => {
            const dateString = moment(date, "YYYY-MM-DD").format("YYYY-MM");
            return {
                Date: dateString,
                "紹介記事数": totalItem,
                "URL数": totalURL,
                "関連URL数": totalURL - totalItem
            };
        });
        const totalResult = {
            "Date": "Total",
            "紹介記事数": results.reduce((total, result) => total + result["紹介記事数"], 0),
            "URL数": results.reduce((total, result) => total + result["URL数"], 0),
            "関連URL数": results.reduce((total, result) => total + result["関連URL数"], 0)
        };
        results.push(totalResult);
        return results;
    }

    render() {
        let data = this._calc(this.props.data);
        return <div className="ItemURLOverviewTableView">
            <Table className="table" data={data}/>
        </div>
    }
}
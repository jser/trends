// LICENSE : MIT
"use strict";
import React from "react"
import {Table,unsafe} from "reactable"
import moment from "moment";
export default class ArticleItemTableView extends React.Component {
    _calc(data) {
        if (!data) {
            return [];
        }
        let keywords = Object.keys(data);
        if (keywords.length === 0) {
            return [];
        }
        // yyyy-mm-dd
        let dateKeyList = data[keywords[0]].map(({date}) => date);
        let results = dateKeyList.map(dateKey => {
            var dateString = moment(dateKey, "YYYY-MM-DD").format("YYYY-MM");
            let result = {date: dateString};
            keywords.forEach(keyword => {
                let dataList = data[keyword];
                let hitObject = dataList.filter(({date}) => date === dateKey)[0];
                var list = hitObject.items.map(item => {
                    return `<li><a href="${item.url}">${item.title}</a></li>`
                }).join("\n");
                result[keyword] = unsafe(`<ul>${list}</ul>`);
            });
            return result;
        });
        return results;
    }

    render() {
        let data = this._calc(this.props.data);
        return <div className="ArticleItemTableView">
            <Table className="table" data={data}/>
        </div>
    }
}
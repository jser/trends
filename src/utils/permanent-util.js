// LICENSE : MIT
"use strict";
import moment from "moment";
import querystring from "querystring"
export function stateToQuery(state) {
    let beginDate = moment(state.beginDate).format("YYYY-MM-DD");
    let endDate = moment(state.endDate).format("YYYY-MM-DDD");
    let keywords = state.keywords;
    return querystring.stringify({
        beginDate,
        endDate,
        keywords
    });
}
export function queryToState(query) {
    return querystring.parse(query)
}
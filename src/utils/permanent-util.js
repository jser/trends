// LICENSE : MIT
"use strict";
import moment from "moment";
import querystring from "querystring"
export function stateToQuery(state) {
    let beginDate = moment(state.beginDate).format("YYYY-MM-DD");
    let endDate = moment(state.endDate).format("YYYY-MM-DDD");
    let keywords = state.keywords;
    let embed = state.embed;
    return querystring.stringify({
        beginDate,
        endDate,
        keywords,
        embed
    });
}
export function queryToState(query) {
    return querystring.parse(query)
}
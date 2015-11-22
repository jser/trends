// LICENSE : MIT
"use strict";
require('string.prototype.includes');
import moment from 'moment';
var momentIterator = require('moment-iterator');
export default class Counting {
    constructor(stat) {
        this.jserStat = stat;
    }

    countingKeywords(keywords, beginDate, endDate) {
        let diffYear = moment(moment(endDate)).diff(moment(beginDate), 'year');
        if (diffYear > 10 || diffYear < 0) {
            console.log(`選んだ日付が広すぎます。Diff year: ${diffYear}`);
            return {};
        }
        /**
         * {
     *  key [{ date, count }]
     * }
         * */
        let results = {};
        momentIterator(beginDate, endDate).each('months', (d) => {
            var startDate = moment(d).startOf("month").toDate();
            var endDate = moment(d).endOf('month').toDate();
            keywords.forEach(keyword => {
                let count = this.countingKeyword(keyword, startDate, endDate);
                if (!results[keyword]) {
                    results[keyword] = [];
                }
                results[keyword].push({
                    date: moment(startDate).format("YYYY-MM-DD"),
                    count: count
                });
            });
        });
        return results;
    }

    countingKeyword(keyword, beginDate, endDate) {
        let count = 0;
        let items = this.jserStat.getItemsBetWeen(beginDate, endDate);
        items.forEach(function (item) {
            let lowerKey = keyword.toLowerCase();
            let containedTag = item.tags.some(function (tag) {
                return tag.toLowerCase().includes(lowerKey);
            });
            if (containedTag) {
                count++;
                return;
            }
            if (item.title.toLowerCase().includes(lowerKey) || item.content.toLowerCase().includes(lowerKey)) {
                count++;
            }
        });
        return count;
    }
}
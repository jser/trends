// LICENSE : MIT
"use strict";
require('string.prototype.includes');
import moment from 'moment';
const momentIterator = require('moment-iterator');

/**
 * @param {JSerItem} item
 */
function countURLofItem(item) {
    let count = 0;
    if (item.url) {
        count++;
    }
    item.relatedLinks.forEach(relatedItem => {
        count++;
    });
    return count;
}
export default class Counting {
    /**
     * @param {JSerStat} stat
     */
    constructor(stat) {
        this.jserStat = stat;
    }

    countingItemsByMonth(beginDate, endDate) {
        let diffYear = moment(moment(endDate)).diff(moment(beginDate), 'year');
        let results = [];
        if (diffYear > 10 || diffYear < 0) {
            console.log(`選んだ日付が広すぎます。Diff year: ${diffYear}`);
            return results;
        }
        momentIterator(beginDate, endDate).each('months', (d) => {
            const startMonth = moment(d).startOf("month").toDate();
            const endMonth = moment(d).endOf('month').toDate();
            const matchItems = this.jserStat.getItemsBetWeen(startMonth, endMonth);
            results.push({
                date: moment(startMonth).format("YYYY-MM-DD"),
                totalItem: matchItems.length,
                totalURL: matchItems.reduce((total, item)=> {
                    return total + countURLofItem(item);
                }, 0),
                items: matchItems
            });
        });
        return results;
    }


    countingKeywords(keywords, beginDate, endDate) {
        let diffYear = moment(moment(endDate)).diff(moment(beginDate), 'year');
        if (diffYear > 10 || diffYear < 0) {
            console.log(`選んだ日付が広すぎます。Diff year: ${diffYear}`);
            return {};
        }
        /**
         * {
         *  key [{ date, count, items }]
         * }
         * */
        let results = {};
        momentIterator(beginDate, endDate).each('months', (d) => {
            var startDate = moment(d).startOf("month").toDate();
            var endDate = moment(d).endOf('month').toDate();
            keywords.forEach(keyword => {
                let matchItems = this.countingKeyword(keyword, startDate, endDate);
                if (!results[keyword]) {
                    results[keyword] = [];
                }
                results[keyword].push({
                    date: moment(startDate).format("YYYY-MM-DD"),
                    count: matchItems.length,
                    items: matchItems
                });
            });
        });
        return results;
    }

    countingKeyword(keyword, beginDate, endDate) {
        let matchItems = [];
        let items = this.jserStat.getItemsBetWeen(beginDate, endDate);
        items.forEach(function (item) {
            let lowerKey = keyword.toLowerCase();
            let containedTag = item.tags.some(function (tag) {
                return tag.toLowerCase().includes(lowerKey);
            });
            if (containedTag) {
                matchItems.push(item);
                return;
            }
            if (item.title.toLowerCase().includes(lowerKey) || item.content.toLowerCase().includes(lowerKey)) {
                matchItems.push(item);
            }
        });
        return matchItems;
    }
}
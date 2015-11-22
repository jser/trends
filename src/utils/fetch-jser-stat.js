// LICENSE : MIT
"use strict";
import {JSerStat} from "jser-stat";
function fetchURL(URL) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', URL);
        req.onload = function () {
            if (req.status >= 200 && req.status < 300) {
                resolve(req.response);
            } else {
                reject(Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(Error(req.statusText));
        };
        req.send();
    });
}
export default function fetchStat() {
    // APIで取ってくる方式
    if (fetchStat._jSerStat) {
        return Promise.resolve(fetchStat._jSerStat);
    }
    return Promise.all([
        fetchURL("http://jser.info/posts.json"),
        fetchURL("http://jser.info/source-data/items.json")
    ]).then(function (results) {
        var posts = JSON.parse(results[0]).reverse();
        var items = JSON.parse(results[1]);
        var jSerStat = new JSerStat(items, posts);
        fetchStat._jSerStat = jSerStat;
        return jSerStat;
    });
}
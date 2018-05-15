// LICENSE : MIT
"use strict";
import { JSerStat } from "@jser/stat";
import { fetchItems, fetchPosts } from "@jser/data-fetcher";

function fetchData() {
    return Promise.all([
        fetchItems(),
        fetchPosts()
    ]);
}

let _jSerStat;
export default function fetchStat() {
    if (_jSerStat) {
        return Promise.resolve(_jSerStat);
    }
    return fetchData().then(([items, posts]) => {
        const jSerStat = new JSerStat(items, posts);
        _jSerStat = jSerStat;
        return jSerStat;
    });
}

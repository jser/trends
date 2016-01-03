// LICENSE : MIT
"use strict";
import React from 'react';
import { render } from 'react-dom';
import AppContext from "./AppContext";
import Container from "material-flux-container";
import LineChart from "./components/LineChart";
import DateRangeInputField from "./components/DateRangeInputField";
import KeywordsInputField from "./components/KeywordsInputField";
import PermanentLink from "./components/PermanentLink";
import DataTableView from "./components/DataTableView";
import ArticleItemTableView from "./components/ArticleItemTableView";
import Counting from "./utils/counting-keywords"
import fetchStat from "./utils/fetch-jser-stat";
import {stateToQuery, queryToState} from "./utils/permanent-util";
const context = new AppContext();
// loading
render(
    <div>
        Now Loading...
    </div>,
    document.getElementById('app')
);
// get permanent hash
(() => {
    let hash = location.hash.replace(/^#/, "");
    let {
        beginDate,
        endDate,
        keywords,
        embed
        } = queryToState(hash);
    if (beginDate) {
        context.dateAction.beginDate(beginDate);
    }
    if (endDate) {
        context.dateAction.endDate(endDate);
    }
    if (keywords) {
        context.keywordsAction.updateKeywords(keywords);
    }
    if(embed) {
        context.keywordsAction.enterEmbedMode();
    }
})();
// fetch and draw
fetchStat().then(stat => {
    let counting = new Counting(stat);
    class App extends React.Component {
        static getStores() {
            return [
                context.dateStore,
                context.keywordsStore
            ]
        }

        static calculateState() {
            return {
                dateStore: context.dateStore.getState(),
                keywordsStore: context.keywordsStore.getState()
            };
        }

        render() {
            let {dateAction, keywordsAction} = context;
            let usedKeywords = this.state.keywordsStore.keywords.filter(keyword => {
                return keyword.length > 0
            });
            let changePermanent = ()=> {
                let state = {
                    beginDate: this.state.dateStore.beginDate,
                    endDate: this.state.dateStore.endDate,
                    keywords: this.state.keywordsStore.keywords
                };
                location.hash = stateToQuery(state)
            };
            var chartData = counting.countingKeywords(usedKeywords, this.state.dateStore.beginDate, this.state.dateStore.endDate);
            return <div className="App">
                <DateRangeInputField
                    beginDate={this.state.dateStore.beginDate} endDate={this.state.dateStore.endDate}
                    onChangeBegin={dateAction.beginDate} onChangeEnd={dateAction.endDate}/>
                <KeywordsInputField keywords={this.state.keywordsStore.keywords}
                                    onUpdateKeywords={keywordsAction.updateKeywords}
                                    onAddKeyword={keywordsAction.addKeyword}
                />
                <PermanentLink onClick={changePermanent}/>
                <LineChart data={chartData}/>
                <div className="DataGridLayout">
                    <DataTableView data={chartData}/>
                    <ArticleItemTableView data={chartData}/>
                </div>
            </div>
        }
    }

    const AppContainer = Container.create(App);
    render(
        <AppContainer />,
        document.getElementById('app')
    );
});
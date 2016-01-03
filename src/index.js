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
import ItemURLOverviewTableView from "./components/ItemURLOverviewTableView";
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
    var hashQueryObject = queryToState(hash);
    let {
        beginDate,
        endDate,
        keywords
        } = hashQueryObject;
    if (beginDate) {
        context.dateAction.beginDate(beginDate);
    }
    if (endDate) {
        context.dateAction.endDate(endDate);
    }
    if (keywords) {
        context.keywordsAction.updateKeywords(keywords);
    }
    if ("embed" in hashQueryObject) {
        context.displayAction.enterEmbedMode();
    }
})();
// fetch and draw
fetchStat().then(stat => {
    const counting = new Counting(stat);
    class App extends React.Component {
        static getStores() {
            return [
                context.dateStore,
                context.displayStore,
                context.keywordsStore
            ]
        }

        static calculateState() {
            return {
                dateStore: context.dateStore.getState(),
                keywordsStore: context.keywordsStore.getState(),
                displayStore: context.displayStore.getState()
            };
        }

        render() {
            let {dateAction, keywordsAction} = context;
            let usedKeywords = this.state.keywordsStore.keywords.filter(keyword => {
                return keyword.length > 0
            });
            const jumpToEmbedLink = () => {
                let state = {
                    beginDate: this.state.dateStore.beginDate,
                    endDate: this.state.dateStore.endDate,
                    keywords: this.state.keywordsStore.keywords,
                    embed: true
                };
                const hash = stateToQuery(state);
                window.open(`${location.href}#${hash}`, '_blank');
            };
            const changePermanent = () => {
                let state = {
                    beginDate: this.state.dateStore.beginDate,
                    endDate: this.state.dateStore.endDate,
                    keywords: this.state.keywordsStore.keywords
                };
                location.hash = stateToQuery(state)
            };
            const chartData = counting.countingKeywords(usedKeywords, this.state.dateStore.beginDate, this.state.dateStore.endDate);
            const articleURLData = counting.countingItemsByMonth(this.state.dateStore.beginDate, this.state.dateStore.endDate);
            // embed mode => show only Chart
            const embedMode = this.state.displayStore.embedMode;
            if (embedMode) {
                return <div className="App">
                    <LineChart embedMode={embedMode} data={chartData}/>
                </div>

            }
            return <div className="App">
                <a href="https://github.com/jser/trends">
                    <img style={{position: "absolute", top: 0,right: 0, border: 0}}
                         src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67"
                         alt="Fork me on GitHub"
                         data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"/></a>
                <DateRangeInputField
                    beginDate={this.state.dateStore.beginDate} endDate={this.state.dateStore.endDate}
                    onChangeBegin={dateAction.beginDate} onChangeEnd={dateAction.endDate}/>
                <KeywordsInputField keywords={this.state.keywordsStore.keywords}
                                    onUpdateKeywords={keywordsAction.updateKeywords}
                                    onAddKeyword={keywordsAction.addKeyword}
                />
                <div className="PermanentLinkLayout">
                    <PermanentLink onClick={changePermanent}>Permanent Link</PermanentLink>
                    <PermanentLink onClick={jumpToEmbedLink}>Embed Link</PermanentLink>
                </div>
                <LineChart data={chartData}/>
                <div className="DataGridLayout">
                    <DataTableView data={chartData}/>
                    <ArticleItemTableView data={chartData}/>
                </div>
                <ItemURLOverviewTableView data={articleURLData}/>
            </div>
        }
    }

    const AppContainer = Container.create(App);
    render(
        <AppContainer />
        ,
        document.getElementById('app')
    );
});
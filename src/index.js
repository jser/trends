// LICENSE : MIT
"use strict";
import React from 'react';
import { render } from 'react-dom';
import AppContext from "./AppContext";
const context = new AppContext();
import Container from "./Container";
import LineChart from "./components/LineChart";
import DateRangeInputField from "./components/DateRangeInputField";
import KeywordsInputField from "./components/KeywordsInputField";
import DataTableView from "./components/DataTableView";
import Counting from "./utils/counting-keywords"
import fetchStat from "./utils/fetch-jser-stat";

// loading
render(
    <div>
        Now Loading...
    </div>,
    document.getElementById('app')
);
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
            var chartData = counting.countingKeywords(usedKeywords, this.state.dateStore.beginDate, this.state.dateStore.endDate);
            return <div className="App">
                <DateRangeInputField
                    beginDate={this.state.dateStore.beginDate} endDate={this.state.dateStore.endDate}
                    onChangeBegin={dateAction.beginDate} onChangeEnd={dateAction.endDate}/>
                <KeywordsInputField keywords={this.state.keywordsStore.keywords}
                                    onUpdateKeywords={keywordsAction.updateKeywords}
                                    onAddKeyword={keywordsAction.addKeyword}
                />
                <LineChart data={chartData}/>
                <DataTableView data={chartData}/>
            </div>
        }
    }

    const AppContainer = Container.create(App);
    render(
        <AppContainer />,
        document.getElementById('app')
    );
});
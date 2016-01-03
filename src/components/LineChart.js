// LICENSE : MIT
"use strict";
import React from "react"
import c3 from "c3";
export default class LineChart extends React.Component {
    _calcDate(data) {
        if (!data) {
            return {};
        }
        // first keywords
        let keywords = Object.keys(data);
        if (keywords.length === 0) {
            return {};
        }
        let results = keywords.map(keyword => {
            let result = [];
            // [ "x" ]
            result.push(keyword);
            let dataList = data[keyword];
            dataList.forEach(({count}) => {
                result.push(count);
            });
            return result;
        });
        // date label
        {
            let result = ["x"];
            data[keywords[0]].map(({date}) => {
                result.push(date);
            });
            results.push(result);
        }
        return results;
    }

    _c3Render() {
        let data = this._calcDate(this.props.data);
        let keywords = Object.keys(this.props.data);
        this.chart = c3.generate({
            bindto: '#chart',
            data: {
                x: 'x',
                columns: data
            },
            axis: {
                y: {
                    label: {
                        text: 'キーワードを紹介した回数',
                        position: 'outer-middle'
                    }
                },
                x: {
                    label: '年月',
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m'
                    }
                }
            },
            grid: {
                x: {
                    show: true
                },
                y: {
                    show: true
                }
            },
            unload: keywords
        })
    }

    /**
     * {
     *  key [{ date, count }]
     * }
     * @param newProps
     */
    componentWillReceiveProps(newProps) {
        let prevProps = this.props;
        let data = this._calcDate(newProps.data);
        let keywords = Object.keys(prevProps.data || {});
        this.chart.load({
            columns: data,
            unload: keywords
        });
    }

    componentDidMount() {
        this._c3Render();
    }

    render() {
        const {embedMode} = this.props;
        if (embedMode) {
            return <div className="LineChart">
                <div id="chart"></div>
            </div>
        }
        return <div className="LineChart">
            <div id="chart"></div>
            <p className="description">
                縦軸はJSer.infoでキーワードを紹介した回数/横軸は年月
            </p>
        </div>
    }
}
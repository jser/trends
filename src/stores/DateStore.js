// LICENSE : MIT
"use strict";
import {Store} from "material-flux";
import {ON_BEGIN_DATE, ON_END_DATE} from "../actions/DateAction";
import ObjectAssign from "object-assign";
import moment from "moment";
export default class DateStore extends Store {
    constructor(...args) {
        super(...args);
        this.state = {
            beginDate: moment().subtract(1, 'year').toDate(),
            endDate: new Date()
        };
        this.register(ON_BEGIN_DATE, this.onBeginDate);
        this.register(ON_END_DATE, this.onEndDate);
    }

    onBeginDate(beginDate) {
        this.setState({beginDate});
    }

    onEndDate(endDate) {
        this.setState({endDate});
    }
}
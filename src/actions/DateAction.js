// LICENSE : MIT
"use strict";
import moment from "moment";
export const ON_BEGIN_DATE = Symbol("開始月");
export const ON_END_DATE = Symbol("終了月");
export default function DateAction(context) {
    let dispatch = context.dispatch.bind(context);
    return new class DateActionInternal {
        beginDate(dateString) {
            let date = moment(dateString, "YYYY-MM");
            dispatch(ON_BEGIN_DATE, date);
        }

        endDate(dateString) {
            let date = moment(dateString, "YYYY-MM");
            dispatch(ON_END_DATE, date);
        }
    }
}
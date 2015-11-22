// LICENSE : MIT
"use strict";
import {Context} from "material-flux";
import DateAction from "./actions/DateAction";
import DateStore from "./stores/DateStore";
import KeywordsAction from "./actions/KeywordsAction";
import KeywordsStore from "./stores/KeywordsStore";
export default class AppContext extends Context {
    constructor(...args) {
        super(...args);

        this.dateAction = new DateAction(this);
        this.dateStore = new DateStore(this);
        this.keywordsAction = new KeywordsAction(this);
        this.keywordsStore = new KeywordsStore(this);
    }
}
// LICENSE : MIT
"use strict";
import {Store} from "material-flux";
import {ON_UPDATE_KEYWORDS,ON_ADD_KEYWORD} from "../actions/KeywordsAction";
import ObjectAssign from "object-assign";
export default class KeywordsStore extends Store {
    constructor(...args) {
        super(...args);
        this.state = {
            keywords: ["React", "Angular"]
        };
        this.register(ON_UPDATE_KEYWORDS, this.onUpdateKeywords);
        this.register(ON_ADD_KEYWORD, this.onAddKeyword);
    }

    getState() {
        return ObjectAssign({}, this.state);
    }

    onUpdateKeywords(keywords) {
        this.setState({keywords});
    }

    onAddKeyword(keyword) {
        let keywords = this.state.keywords;
        keywords.push(keyword);
        this.setState({keywords});
    }
}
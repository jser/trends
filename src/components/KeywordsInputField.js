// LICENSE : MIT
"use strict";
import React from "react"
class KeywordInput extends React.Component {
    render() {
        return <div className="KeywordInput">
            <input defaultValue={this.props.value} ref="input" onChange={this.props.onChange}/>
        </div>
    }
}
export default class KeywordsInputField extends React.Component {
    constructor(...args) {
        super(...args);
        this.keywords = this.props.keywords;
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.keywords = this.props.keywords;
    }

    onAddKeyword(evt){
        this.props.onAddKeyword("");
    }
    onSubmit(evt) {
        evt.preventDefault();
        this.props.onUpdateKeywords(this.keywords);
    }

    onChange(index, evt) {
        let keywords = this.keywords;
        keywords[index] = evt.target.value;
        this.keywords = keywords;
    }

    render() {
        let inputs = this.props.keywords.map((keyword, index) => {
            return <KeywordInput key={keyword + index} value={keyword} onChange={this.onChange.bind(this, index)}/>
        });
        return <div className="KeywordsInputField">
            <span>キーワード:</span>
            <form onSubmit={this.onSubmit.bind(this)}>
                {inputs}
                <input type="button" onClick={this.onAddKeyword.bind(this)} value="キーワードを追加"/>
                <input type="submit" value="Update"/>
            </form>
        </div>
    }
}
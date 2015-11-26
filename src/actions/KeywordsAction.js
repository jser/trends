// LICENSE : MIT
"use strict";
export const ON_UPDATE_KEYWORDS = Symbol("キーワード一覧");
export const ON_ADD_KEYWORD = Symbol("キーワード追加");
export default function KeywordsAction(context) {
    let dispatch = context.dispatch.bind(context);
    return new class {
        updateKeywords(keywords = []) {
            dispatch(ON_UPDATE_KEYWORDS, keywords);
        }

        addKeyword(keyword = "") {
            dispatch(ON_ADD_KEYWORD, keyword);
        }
    }
}
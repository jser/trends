// LICENSE : MIT
"use strict";
import {Store} from "material-flux";
import {ENTER_EMBED_MODE} from "../actions/DisplayAction";
import ObjectAssign from "object-assign";
export default class DisplayStore extends Store {
    constructor(...args) {
        super(...args);
        this.state = {
            embedMode: false
        };
        const updateEmbedMode = (embedMode) => {
            this.setState({
                embedMode
            });
        };
        this.register(ENTER_EMBED_MODE, updateEmbedMode);
    }
}
// LICENSE : MIT
"use strict";
import moment from "moment";
export const ENTER_EMBED_MODE = Symbol("埋め込み表示モードへ移行");
export default function DisplayAction(context) {
    let dispatch = context.dispatch.bind(context);
    return new class DisplayActionInternal {
        enterEmbedMode() {
            dispatch(ENTER_EMBED_MODE, {
                embedMode: true
            });
        }

        leaveEmbedMode() {
            dispatch(ENTER_EMBED_MODE, {
                embedMode: false
            });
        }
    }
}
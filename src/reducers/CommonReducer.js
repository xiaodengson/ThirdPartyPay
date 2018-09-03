/**
 * Created by dengfuming on 2018/8/10.
 */

import {FETCH_LOADING_VISIBLE} from "../actions/CommonAction";
const defaultState={
    loadingVisible:false,
    title:""
}

const commonReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_LOADING_VISIBLE:
            return {
                ...state,
                loadingVisible: action.visible,
                title:action.title
            };
        default:
            return state
    }
}

export default commonReducer
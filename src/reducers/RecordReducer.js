/**
 * Created by dengfuming on 2018/8/20.
 */
import {
    CLEAR_ORDER_DETAIL, CLEAR_ORDER_DETAIL_LIST, ORDER_DETAIL, ORDER_DETAIL_LIST,
    SHOW_REFUND_DIALOG
} from "../actions/RecordAction";

const defaultState = {
    list: [],
    tabIndex: 0,
    page: 1,
    hasNext: false,
    header:{},
    detailList:[],
    showRefund:false,
    canRefundFee:0,
    visible:false
}

const recordReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ORDER_DETAIL_LIST:
            return {
                ...state,
                list: action.list,
                tabIndex: action.tabIndex,
                page: action.page,
                hasNext: action.hasNext
            };
        case CLEAR_ORDER_DETAIL_LIST:
            return {
                ...state,
                list: [],
                tabIndex: action.tabIndex
            }
        case ORDER_DETAIL:
            return {
                ...state,
                header:action.header,
                detailList: action.detailList,
                showRefund:action.showRefund,
                canRefundFee:action.canRefundFee
            }
        case SHOW_REFUND_DIALOG:
            return {
                ...state,
                visible:action.visible
            }
            break;
        default:
            return state

    }
}

export default recordReducer
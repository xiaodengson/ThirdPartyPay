/**
 * Created by dengfuming on 2018/8/7.
 */
import {
    CHANGE_AMOUNT, REMARK_MODAL_TEXT, REMARK_MODAL_VISIBLE, UNDISCOUNT_MODAL_AMOUNT,
    UNDISCOUNT_MODAL_VISIBLE, UNDISCOUNT_MODAL_WARN
} from '../actions/HomeAction'

const defaultState = {
    amount: '0',
    clickable: false,
    undiscountvisible: false,
    undiscountPrice: "添加不可优惠金额",
    remarkVisible: false,
    remark: "备注:"
}

const homeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_AMOUNT:
            return {
                ...state,
                amount: action.amount,
                clickable: action.clickable
            };
        case UNDISCOUNT_MODAL_VISIBLE:
            return {
                ...state,
                undiscountvisible: action.visible
            }
        case UNDISCOUNT_MODAL_AMOUNT:
            return {
                ...state,
                undiscountPrice: action.price
            }
        case UNDISCOUNT_MODAL_WARN:
            return {
                ...state,
                showWarn: action.showWarn
            }
        case REMARK_MODAL_VISIBLE:
            return {
                ...state,
                remarkVisible: action.visible
            }
        case REMARK_MODAL_TEXT:
            return {
                ...state,
                remark: action.remark
            }

        default:
            return state

    }
}

export default homeReducer


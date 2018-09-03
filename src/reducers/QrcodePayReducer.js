/**
 * Created by dengfuming on 2018/8/13.
 */

import {PAY_LIST, PAY_REAL_AMOUNT, PAY_STATUS, QRCODE_URL} from "../actions/QrcodePayAction";
const defaultState = {
    url:"",
    payStatus:"",
    errorReason:"",
    imageUrl:0,
    payList:[],
    realAmount:0
}

const qrCodePayReducer = (state = defaultState, action)=>{
    switch (action.type) {
        case QRCODE_URL:
            return {
                ...state,
                url: action.url
            };
        case PAY_STATUS:
            return{
                ...state,
                payStatus:action.payStatus,
                imageUrl:action.imageUrl,
                errorReason:action.errorReason
            }
        case PAY_LIST:
            return{
                ...state,
                payList:action.payList
            }
        case PAY_REAL_AMOUNT:
            return{
                ...state,
                realAmount:action.realAmount
            }
        default:
            return state
    }

}

export default qrCodePayReducer
/**
 * Created by dengfuming on 2018/8/7.
 */
import HomeReducer from './HomeReducer';
import CommonReducer from './CommonReducer';
import QrCodePayReducer from './QrcodePayReducer';
import RecordReducer from './RecordReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    home:HomeReducer,
    common:CommonReducer,
    qrcode:QrCodePayReducer,
    record:RecordReducer
})

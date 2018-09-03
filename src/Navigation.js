/**
 * Created by dengfuming on 2018/8/6.
 */

import {
    createStackNavigator
} from 'react-navigation';
import {
    Image,
    View,
    Button,
    StyleSheet,
    TouchableOpacity,
    Text,
    BackHandler,
    AsyncStorage, ScrollView
} from 'react-native';

import StackOption from './StackOptions'
import Home from '../src/home/Home'
import QrcodePay from "./qrcodePay/QrcodePay";
import Record from "./record/Record";
import RecordDetail from "./record/RecordDetail";

const rightClick =(navigation:Object) =>{
    navigation.navigate('Record')
}
const Navigation = createStackNavigator({
    Home:{
        screen:Home,
        navigationOptions:({navigation}) => StackOption({navigation}, null, false, "收银台", true, "账单统计", true,rightClick)
    },
    QrcodePay:{
        screen:QrcodePay,
        navigationOptions:({navigation}) => StackOption({navigation}, null, false, "二维码收款", true)
    },
    Record:{
        screen:Record,
        navigationOptions:({navigation}) => StackOption({navigation}, null, false, "交易明细", true)
    },
    RecordDetail:{
        screen:RecordDetail,
        navigationOptions:({navigation}) => StackOption({navigation}, null, false, "账单详情", true)
    }
})

export default Navigation
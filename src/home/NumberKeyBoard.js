/**
 * Created by dengfuming on 2018/8/6.
 */
import React, {Component} from 'react';
import {
    Image,
    StyleSheet, Text,
    TouchableOpacity,
    ToastAndroid,
    View
} from 'react-native';
import {scaleSize,setSpText,screenW,screenH} from '../../src/util/ScreenUtils';
import {connect} from "react-redux";
import * as Actions from '../actions/HomeAction'
import JsonUtil from "../util/JsonUitl";
import FetchUtil from "../util/FetchUtil";

const NumberKey =({style,data,onClick})=>{
    let type = ( typeof data == 'number')? 'number':'.'
    return(
        <TouchableOpacity style={style} onPress={()=>{onClick(type,data)}}>
            <Text style={styles.textNumber}>{data}</Text>
        </TouchableOpacity>
    )
}

class NumberKeyBoard extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }


    onClick = (type,data)=>{
        const {deletePress,dotPress,numberPress,longPressDel} = this.props;
        switch (type){
            case 'del':
                deletePress();
                break;
            case '.':
                dotPress();
                break;
            case 'number':
                numberPress(data)
                break;
            case 'longPress':
                longPressDel();
                break;
            case 'ok':
                this.porderGen();
                break;
        }
    }

    porderGen(){
        const {amount,undiscountPrice,remark,navigate}= this.props;
        let body = new Map();
        if (undiscountPrice != "添加不可优惠金额"){
            body.set("undiscountableAmount",undiscountPrice);
        }
        if (remark != "备注:"){
            body.set("remark",remark);
        }
        body.set("amount",parseFloat(amount)*100);
        body.set("orderType",2);
        let request = JsonUtil.mapToString(body);
        console.log("--test--"+JSON.stringify(request));
        let fetchUtil = new FetchUtil();
        fetchUtil.init()
            .showDialog(true,"正在生成订单,请稍后...")
            .setUrl("http://saofu.client.test-a.saofu.cn/payment-api-pos/porder_gen")
            .setBody(request)
            .onResponse(response=>{
                console.log("--test--response:"+JSON.stringify(response))
                switch (response.code){
                    case "4001":
                        navigate('QrcodePay',{orderId:response.orderId});
                        break;
                    default:
                        ToastAndroid.show("发起支付失败"+response.reason,ToastAndroid.SHORT);
                        break;
                }
                return true;
            })
            .dofetch()
            .catch(
                (error)=>{
                    ToastAndroid.show("发起支付失败"+error,ToastAndroid.SHORT)
                }
            );
    }

    render(){
        const {clickable} = this.props;
        return (

            <View style={{height:3*screenH/5}}>
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={styles.viewLeft}>
                        <NumberKey style={styles.touchSingle}   data={7} onClick={this.onClick}/>
                        <NumberKey style={styles.touchSingle} data={8} onClick={this.onClick}/>
                        <NumberKey style={styles.touchSingle}   data={9} onClick={this.onClick}/>
                        <NumberKey style={styles.touchSingle}   data={4} onClick={this.onClick}/>
                        <NumberKey style={styles.touchSingle} data={5} onClick={this.onClick}/>
                        <NumberKey style={styles.touchSingle}   data={6} onClick={this.onClick}/>
                    </View>
                    <TouchableOpacity style={styles.viewRight} onPress={()=>{this.onClick('del')}}
                                      onLongPress={()=>{this.onClick('longPress')}}>
                        <Image style={styles.imageDel} source={require('./../../resources/keyboard_del.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={styles.viewLeft}>
                        <NumberKey style={styles.touchSingle}   data={1} onClick={this.onClick}/>
                        <NumberKey style={styles.touchSingle} data={2} onClick={this.onClick}/>
                        <NumberKey style={styles.touchSingle}   data={3} onClick={this.onClick}/>
                        <NumberKey style={styles.touchDouble} data={0} onClick={this.onClick}/>
                        <NumberKey style={styles.touchSingle}   data={'.'} onClick={this.onClick}/>
                    </View>
                    <TouchableOpacity style={[styles.viewRight,{backgroundColor:(clickable)?'#10a1f1':'#909090'}]}
                                      disabled={!clickable} onPress={()=>{this.onClick('ok')}} >
                        <Text style={styles.textOk}>确认</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    amount:state.home.amount,
    clickable:state.home.clickable,
    undiscountPrice:state.home.undiscountPrice,
    remark:state.home.remark,
})

const mapDispatchToProps = (dispatch) =>({
    numberPress:(price)=>dispatch(Actions.numberPress(price)),
    deletePress:()=>dispatch(Actions.deletePress()),
    dotPress:()=>dispatch(Actions.dotPress()),
    longPressDel:()=>dispatch(Actions.longPressDel())
})

export default connect(mapStateToProps,mapDispatchToProps)(NumberKeyBoard)

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        backgroundColor:'white'
    },
    viewLeft:{
        width:3*screenW/4,
        flexDirection:'row',
        flexWrap:'wrap',
    },
    viewRight:{
        width:screenW/4,
        justifyContent:'center',
        alignItems:'center'
    },
    touchSingle:{
        borderRightWidth:scaleSize(1),
        borderBottomWidth:scaleSize(1),
        borderColor:'#d0d0d0',
        justifyContent:'center',
        alignItems:'center',
        width:screenW/4,
        height:3*screenH/20
    },
    touchDouble:{
        borderRightWidth:scaleSize(1),
        borderBottomWidth:scaleSize(1),
        borderColor:'#d0d0d0',
        justifyContent:'center',
        alignItems:'center',
        width:screenW/2,
        flex:3*screenH/20
    },
    textNumber:{
        fontSize:setSpText(20),
        color:'#000000',
    },
    textOk:{
        fontSize:setSpText(16),
        color:'#000000',
    },
    imageDel:{
        resizeMode:'stretch',
        width:scaleSize(60),
        height:scaleSize(40)
    }

});
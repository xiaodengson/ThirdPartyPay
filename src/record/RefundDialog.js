/**
 * Created by dengfuming on 2018/8/24.
 */
import React, {Component} from 'react';
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ToastAndroid,
    View
} from 'react-native';
import {screenH, screenW,setSpText,scaleSize} from "../util/ScreenUtils";
import {connect} from "react-redux";
import {refundData, showRefundDialog} from "../actions/RecordAction";
import PriceUtil from './../util/PriceUtil';
import PropType from 'prop-types';

class RefundDialog extends Component {

    static propTypes = {
        tradeId:PropType.string
    }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
        this.refundPrice = -1;
        this.password ="";
    }

    onPriceChange = (price)=>{
        const {canRefundFee} = this.props;
        this.refundPrice = parseFloat(price)*100;
        if (this.refundPrice > (canRefundFee+0.01)){//因为精度丢失所以加0.01
            ToastAndroid.show("退款金额不能大于最大退款金额"+this.refundPrice,ToastAndroid.SHORT)
        }
    }

    onPasswordChange = (password)=>{
        this.password = password
    }

    closeDialog =()=>{
        const {showRefundDialog}=this.props;
        showRefundDialog(false)
    }

    refundClick =()=>{
        const {showRefundDialog,refundData,tradeId}=this.props;
        if (this.password == ""){
            ToastAndroid.show("密码不能为空",ToastAndroid.SHORT);
        }else {
            showRefundDialog(false);
            refundData(this.refundPrice,this.password,tradeId);
        }
    }

    render(){
        const {visible,canRefundFee} = this.props;
        let defaultRefundFee = canRefundFee/100;
        return(
            <Modal
                visible={visible}
                onRequestClose={()=>{}}
                transparent={true}>
                <View style={{width:screenW,height:screenH,alignItems: 'center',justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                    <KeyboardAvoidingView style={styles.viewRefund}>
                        <View style={styles.viewTitle}>
                            <Text style={styles.textTitle}>权限验证</Text>
                            <View style={{flex:1}}/>
                            <TouchableOpacity onPress={()=>this.closeDialog()}>
                                <Image style={styles.image}  source={require("./../../resources/close_icon.png")}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.line}/>
                        <Text style={styles.textPrice}>{PriceUtil.priceToString(canRefundFee)}</Text>
                        <View style={styles.viewTextInput}>
                            <Text style={styles.textTitle}>退款金额:</Text>
                            <TextInput style={styles.textInput}
                                       placeholder={"请输入退款金额"}
                                       placeholderTextColor='#909090'
                                       underlineColorAndroid='transparent'
                                       keyboardType='numeric'
                                       defaultValue={defaultRefundFee.toString()}
                                       multiline={true}
                                       autoFocus={false}
                                       onChangeText={(text)=>this.onPriceChange(text)}/>
                        </View>
                        <View style={styles.viewTextInput}>
                            <Text style={styles.textTitle}>退款密码:</Text>
                            <TextInput style={styles.textInput}
                                       placeholder={"请输入6位门店密码"}
                                       placeholderTextColor='#909090'
                                       underlineColorAndroid='transparent'
                                       keyboardType='numeric'
                                       multiline={true}
                                       secureTextEntry={true}
                                       autoFocus={true}
                                       maxLength={6}
                                       onChangeText={(text)=>this.onPasswordChange(text)}/>
                        </View>
                        <View style={styles.line}/>
                        <Text style={styles.textRefund} onPress={()=>this.refundClick()}>确认退款</Text>
                    </KeyboardAvoidingView>
                </View>
            </Modal>
        );
    }
}
const mapStateToProps = state => ({
    visible:state.record.visible,
    canRefundFee:state.record.canRefundFee
})
const mapDispatchToProps = (dispatch) =>({
    showRefundDialog:(visible)=>dispatch(showRefundDialog(visible)),
    refundData:(refundFee,password,tradeOrderId)=>dispatch(refundData(refundFee,password,tradeOrderId))
})

export default connect(mapStateToProps,mapDispatchToProps)(RefundDialog);

const styles = StyleSheet.create({
    viewRefund:{
        width:screenW*5/6,
        backgroundColor:'white',
        borderRadius:scaleSize(10),
        alignItems:'center',
    },
    line:{
        width:screenW*5/6,
        height:scaleSize(1),
        backgroundColor:'#dddddd'
    },
    viewTitle:{
        height:scaleSize(100),
        flexDirection:'row',
        padding:scaleSize(10),
        alignItems:'center'
    },
    image:{
        width:scaleSize(60),
        height:scaleSize(60),
        resizeMode:'stretch'
    },
    textPrice:{
        fontSize:setSpText(15),
        color:'#000000',
        textAlignVertical:'center',
        marginBottom:scaleSize(20),
        marginTop:scaleSize(20)
    },
    textTitle:{
        fontSize:setSpText(8),
        color:'#000000'
    },
    viewTextInput:{
        borderWidth:1,
        borderColor:"#d0d0d0",
        borderRadius:scaleSize(10),
        height:scaleSize(100),
        paddingLeft:scaleSize(10),
        paddingRight: scaleSize(10),
        flexDirection:'row',
        alignItems:'center',
        marginLeft:scaleSize(20),
        marginRight:scaleSize(20),
        marginBottom:scaleSize(30),
        width:screenW*5/6-scaleSize(40),
    },
    textInput:{
        flex:1,
        fontSize:setSpText(7),
        marginLeft:scaleSize(10),
        alignSelf:'center'
    },
    textRefund:{
        fontSize:setSpText(10),
        color:'#000000',
        height:scaleSize(100),
        textAlignVertical:'center',
    }
});
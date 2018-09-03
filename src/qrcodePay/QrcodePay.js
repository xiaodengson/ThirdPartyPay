/**
 * Created by dengfuming on 2018/8/10.
 */
import React, {Component} from 'react';
import {
    StyleSheet, Text,
    ToastAndroid,
    View
} from 'react-native';
import PayStatus from "./PayStatus";
import PayInfoList from "./PayInfoList";
import FetchUtil from "../util/FetchUtil";
import PriceUtil from "../util/PriceUtil"
import {connect} from "react-redux";
import {setPayList, setPayStatus, setQrcodeUrl, setRealAmount} from "../actions/QrcodePayAction";
const PAY_LIST_NATIVE = 1;
const PAY_LIST_POLLING = 2;

class QrcodePay extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
        this.interval = null;
        this.timeOut = null;
    }

    componentWillMount() {
        const {setQrcodeUrl,setRealAmount} = this.props;
        const {orderId} = this.props.navigation.state.params;
        let fetchUtil = new FetchUtil();
        fetchUtil.init()
            .setUrl("http://saofu.client.test-a.saofu.cn/payment-api-pos/native_1")
            .setBody({orderId:orderId})
            .onResponse(response=>{
                switch (response.code){
                    case "4001":
                        let url = response.url;
                        setQrcodeUrl(url);
                        setRealAmount(response.price);
                        this.setPayList(response,PAY_LIST_NATIVE);
                        break;
                    default:
                        ToastAndroid.show("预支付失败"+response.errorId,ToastAndroid.SHORT);
                        break;
                }
                return true;
            })
            .dofetch()
            .catch(
                (error)=>{
                    ToastAndroid.show("预支付失败"+error,ToastAndroid.SHORT);
                }
            );

    }

    componentDidMount() {
        //3秒轮训一次
        this.interval = setInterval(()=>{
            this.pollingOrder()
        },3000);
        //3分钟后未轮训到支付结果显示超时
        this.timeOut = setTimeout(()=>{
            this.pollingOrderTimeOut()
        },3000*60)
    }

    //轮训
    pollingOrder (){
        const {orderId} = this.props.navigation.state.params;
        const {setPayStatus,setRealAmount} = this.props;
        let fetchUtil = new FetchUtil();
        fetchUtil.init()
            .setUrl("http://saofu.client.test-a.saofu.cn/payment-api-pos/polling_order")
            .setBody({orderId:orderId})
            .onResponse(response=>{
                console.log("--test--"+JSON.stringify(response));
                switch (response.code){
                    case "4001":
                        setPayStatus("收款成功",require("../../resources/success_pay.png"),"");
                        this.setPayList(response,PAY_LIST_POLLING);
                        this.stopPollingOrder();
                        break;
                    case "4000":
                        setPayStatus("收款失败",require("../../resources/failed_pay.png"),response.reason);
                        setRealAmount(0);
                        this.stopPollingOrder();
                        break;
                    default:
                        break;
                }
                return true;
            })
            .dofetch()
            .catch(
                (error)=>{
                    console.log("--test--"+JSON.stringify(error));
                    setPayStatus("收款失败",require("../../resources/failed_pay.png"),error);
                    this.stopPollingOrder();
                }
            );
    }

    setPayList(reponse:Object,type:number){
        const {setPayList} = this.props;
        let list = new Array();
        if (type == PAY_LIST_NATIVE){
            if (reponse.price != null){
                list.push({left:"订单金额",right:PriceUtil.priceToString(reponse.price)});
                list.push({left:"实收金额",right:PriceUtil.priceToString(reponse.price)});
            }else {
                list.push({left:"订单金额",right:0});
                list.push({left:"实收金额",right:0});
            }
            list.push({left:"支付方式",right:"微信支付"});
            if (reponse.orderId != null){
                list.push({left:"交易单号",right:reponse.orderId});
            }
            list.push({left:"交易时间",right:this.getNowFormatDate()});
        } else if (type == PAY_LIST_POLLING){
            if (reponse.body != null) {
                reponse.body.map((item)=>{
                    list.push({left:item.description,right:item.value});
                })
            }
        }
        setPayList(list);

    }
    getNowFormatDate() {
        let date = new Date();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        let currentdate = date.getFullYear() + "-" + month + "-" + strDate
            + " " + date.getHours() + ":" + date.getMinutes()
            + ":" + date.getSeconds();
        return currentdate;
    }

    stopPollingOrder(){
        clearInterval(this.interval);
        clearTimeout(this.timeOut);
    }

    pollingOrderTimeOut(){
        const {setPayStatus,payStatus} = this.props;
        if (payStatus === ""){
            setPayStatus("收款等待超时",require("../../resources/time_out_pay.png"),"");
        }
        clearInterval(this.interval);
        clearTimeout(this.timeOut);
    }

    //组件销毁时重置数据
    componentWillUnmount() {
        const {setPayStatus,setQrcodeUrl,setRealAmount,setPayList} = this.props;
        clearInterval(this.interval);
        clearTimeout(this.timeOut);
        setPayStatus("",0,"");
        setQrcodeUrl("");
        setPayList([]);
        setRealAmount(0);
    }

    render(){
        const {url,payStatus,imageUrl,errorReason,payList,realAmount} = this.props;
        return(
            <View style={styles.payView}>
                <PayStatus payStatus={payStatus} errorReason={errorReason} title={"重庆小面"} imageUrl={imageUrl} url={url}/>
                <PayInfoList payList={payList} realAmount={PriceUtil.priceToString(realAmount)}/>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    url:state.qrcode.url,
    payStatus:state.qrcode.payStatus,
    imageUrl:state.qrcode.imageUrl,
    errorReason:state.qrcode.errorReason,
    payList:state.qrcode.payList,
    realAmount:state.qrcode.realAmount
})

const mapDispatchToProps = (dispatch) =>({
    setQrcodeUrl:(url)=>dispatch(setQrcodeUrl(url)),
    setPayStatus:(payStatus,imageUrl,errorReason)=>dispatch(setPayStatus(payStatus,imageUrl,errorReason)),
    setPayList:(payList)=>dispatch(setPayList(payList)),
    setRealAmount:(realAmount)=>dispatch(setRealAmount(realAmount))
})

export default connect(mapStateToProps,mapDispatchToProps)(QrcodePay);

const styles = StyleSheet.create({
    payView:{
        flex:1,
    }
});
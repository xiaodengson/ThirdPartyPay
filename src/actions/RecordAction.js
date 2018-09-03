/**
 * Created by dengfuming on 2018/8/20.
 */

import FetchUtil from "../util/FetchUtil";
import {ToastAndroid} from 'react-native';
import Util from '../util/Util';
export const ORDER_DETAIL_LIST = "ORDER_DETAIL_LIST";
export const CLEAR_ORDER_DETAIL_LIST = "CLEAR_ORDER_DETAIL_LIST";
export const ORDER_DETAIL = "ORDER_DETAIL";
export const CLEAR_ORDER_DETAIL = "CLEAR_ORDER_DETAIL";
export const SHOW_REFUND_DIALOG = "SHOW_REFUND_DIALOG";

export const setOrderDetailList = (list:array,tabIndex:number,page:number,hasNext:boolean)=>{
    return{
        type:ORDER_DETAIL_LIST,
        list,
        tabIndex,
        page,
        hasNext
    }
}

export const clearOrderDetailList = ()=>(dispatch, getState)=>{
    dispatch(setOrderDetailList([],0,1,false));
}


export const setOrderDetail =(detail:Object)=>{
    return {
        type:ORDER_DETAIL,
        header:detail.header,
        detailList:detail.detailList,
        showRefund:detail.showRefund,
        canRefundFee:detail.canRefundFee
    }
}


export const clearOrderDetail = ()=>(dispatch, getState)=>{
    let detail = {};
    detail.header = {};
    detail.detailList = [];
    detail.showRefund = false;
    detail.canRefundFee = 0;
    dispatch(setOrderDetail(detail));
}

export const showRefundDialog = (visible:boolean)=>{
    return{
        type:SHOW_REFUND_DIALOG,
        visible
    }
}


export const getRecordList =(page:number,tabIndex:number,showDialog:boolean)=>(dispatch, getState)=>{
    console.log("--test-- page:"+page+" tabIndex:"+tabIndex);

    let fetchUtil = new FetchUtil();
    fetchUtil.init()
        .showDialog(showDialog,"正在获取订单,请稍后...")
        .setUrl("http://saofu.client.test-a.saofu.cn/payment-api-pos/statistics_order/list")
        .setBody({page:page, source:1,status:tabIndex,version:"1.0"})
        .onResponse(response=>{
            console.log("--test-- Record:"+JSON.stringify(response));
            switch (response.code){
                case "4001":
                    let data;
                    if (page ==1 ){
                        data = response.tradeList;
                    }else {
                        let {list} = getState().record;
                        data = list.concat(response.tradeList);
                    }
                    dispatch(setOrderDetailList(data,tabIndex,page,response.hasNext));
                    break;
                default:
                    ToastAndroid.show("获取交易明细失败"+response.errorId,ToastAndroid.SHORT);
                    break;
            }
            return true;
        })
        .dofetch()
        .catch(
            (error)=>{
                ToastAndroid.show("获取交易明细异常"+error,ToastAndroid.SHORT);
            }
        );
}

export const getOrderDetail =(tradeId:string)=>(dispatch,getState)=>{
    let fetchUtil = new FetchUtil();
    fetchUtil.init()
        .showDialog(true,"加载中...")
        .setUrl("http://saofu.client.test-a.saofu.cn/payment-api-pos/statistics_order/item")
        .setBody({tradeId:tradeId})
        .onResponse(response=>{
            console.log("--test-- OrderDetail:"+JSON.stringify(response));
            switch (response.code){
                case "4001":
                    let detail = setDetailData(response);
                    dispatch(setOrderDetail(detail));
                    break;
                default:
                    ToastAndroid.show("获取账单详情失败"+response.errorId,ToastAndroid.SHORT);
                    break;
            }
            return true;
        })
        .dofetch()
        .catch(
            (error)=>{
                ToastAndroid.show("获取账单详情异常"+error,ToastAndroid.SHORT);
            }
        );
}

export const refundData =(refundFee:number,password:string,tradeOrderId:string)=>(dispatch,getState)=>{
    let superPass = Util.md5(password);
    let fetchUtil = new FetchUtil();
    fetchUtil.init()
        .setUrl("http://saofu.client.test-a.saofu.cn/payment-api-pos/tradeorder/refund")
        .setBody({refundFee:refundFee,superPass:superPass,tradeOrderId:tradeOrderId})
        .onResponse(response=>{
            console.log("--test-- refund:"+JSON.stringify(response));
            switch (response.code){
                case "4001":
                    dispatch(getOrderDetail(tradeOrderId));
                    break;
                default:
                    ToastAndroid.show("退款失败"+response.reason,ToastAndroid.SHORT);
                    break;
            }
            return true;
        })
        .dofetch()
        .catch(
            (error)=>{
                ToastAndroid.show("退款失败"+error,ToastAndroid.SHORT);
            }
        );
}


const setDetailData=(response:Object)=>{
    let detail = {};
    let header = {};
    let detailList = [];
    let showRefund = false;
    let canRefundFee = 0;
    for (let headerInfo of response.headerInfos){
        switch (headerInfo.key){
            case "paymentChannel":
                header.paymentChannel = headerInfo.value;
                break;
            case "orderFee":
                header.orderFee = headerInfo.value;
                break;
            case "reason":
                header.reason = headerInfo.value;
                break;
        }
    }

    header.paymentStatus = response.paymentStatus.value;

    if (response.baseInfos.length>0){
        detailList.push({key:"基本信息",data:response.baseInfos})
    }

    if (response.discountInfos.length>0){
        detailList.push({key:"优惠信息",data:response.discountInfos})
    }

    if (response.platformInfos.length>0){
        detailList.push({key:"平台信息",data:response.platformInfos})
    }

    if (response.remarkInfos.length>0){
        detailList.push({key:"备注",data:response.remarkInfos})
    }
    if (response.itemButtons.indexOf('2') != -1){
        showRefund = true;
    }
    detail.header = header;
    detail.detailList = detailList;
    detail.showRefund = showRefund;
    detail.canRefundFee = response.canRefundFee;

    return detail;

}
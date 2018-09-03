/**
 * Created by dengfuming on 2018/8/13.
 */
export const QRCODE_URL = "QRCODE_URL";
export const PAY_STATUS ="PAY_STATUS";
export const PAY_LIST = "PAY_LIST";
export const PAY_REAL_AMOUNT = "PAY_REAL_AMOUNT"

export const setQrcodeUrl = (url:string)=>{
    return{
        type:QRCODE_URL,
        url
    }
}

export const setPayStatus = (payStatus:string,imageUrl:number,errorReason:string) =>{
    return{
        type:PAY_STATUS,
        payStatus,
        imageUrl,
        errorReason
    }
}

export const setPayList = (payList:array)=>{
    return{
        type:PAY_LIST,
        payList
    }
}

export const setRealAmount =(realAmount:number) =>{
    return{
        type:PAY_REAL_AMOUNT,
        realAmount
    }
}
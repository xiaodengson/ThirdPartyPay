/**
 * Created by dengfuming on 2018/8/7.
 */


export const CHANGE_AMOUNT = 'CHANGE_AMOUNT';
export const UNDISCOUNT_MODAL_VISIBLE ='UNDISCOUNT_MODAL_VISIBLE';
export const UNDISCOUNT_MODAL_AMOUNT ='UNDISCOUNT_MODAL_AMOUNT';
export const UNDISCOUNT_MODAL_WARN ='UNDISCOUNT_MODAL_WARN';
export const REMARK_MODAL_VISIBLE = 'REMARK_MODAL_VISIBLE';
export const REMARK_MODAL_TEXT = 'REMARK_MODAL_TEXT';

export const changeAmount = (amount:string,clickable:boolean)=>{
    return{
        type:CHANGE_AMOUNT,
        amount,
        clickable
    }

}

export const undiscountVisible =(visible:boolean)=>{
    return{
        type:UNDISCOUNT_MODAL_VISIBLE,
        visible
    }
}

export const undiscountAmount = (price:string)=>{
    return{
        type:UNDISCOUNT_MODAL_AMOUNT,
        price
    }
}

export const undiscountWarn = (showWarn:boolean)=>{
    return{
        type:UNDISCOUNT_MODAL_WARN,
        showWarn
    }
}

export const remarkVisible =(visible:boolean)=>{
    return{
        type:REMARK_MODAL_VISIBLE,
        visible
    }
}

export const remarkText = (remark:string)=>{
    return{
        type:REMARK_MODAL_TEXT,
        remark
    }
}



export const numberPress = price =>(dispatch, getState)=> {
    let {amount} = getState().home;
    let len = amount.length;
    let dian = amount.indexOf('.');
    if ((dian != -1 &&(len - amount.lastIndexOf(".") >= 3))||(dian == -1&& len>=7)) {
        return;
    }
    if (len == 1 && amount === '0'){
        amount = amount.replace('0',price)
    }else {
        amount +=price
    }
    let clickable = (parseFloat(amount)>0.0)?true:false
    dispatch(changeAmount(amount,clickable))
}


export const deletePress = () =>(dispatch, getState)=> {
    let {amount} = getState().home;
    let len = amount.length;
    if (amount != null && len>1){
        amount = amount.substring(0,len-1);
    } else if (amount != null && len==1){
        amount = '0';
    }
    let clickable = (parseFloat(amount)>0.0)?true:false
    dispatch(changeAmount(amount,clickable))
}

export const longPressDel = () => (dispatch)=> {
    dispatch(changeAmount('0',false))
}


export const dotPress = () => (dispatch, getState)=>{
    let {amount} = getState().home;
    let dian = amount.indexOf('.');
    if (dian != -1){
        return;
    }else {
        amount +='.';
    }
    let clickable = (parseFloat(amount)>0.0)?true:false
    dispatch(changeAmount(amount,clickable))
}



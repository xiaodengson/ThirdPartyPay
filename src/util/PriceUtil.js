/**
 * Created by dengfuming on 2017/11/17.
 */

export default class PriceUtil{
    //时间转换
   static formatDateTime = (timeStamp) =>{
        var date = new Date(timeStamp);
        // date.setTime(timeStamp * 1000);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    };
   //价格转换
   static priceToString = (price) =>{
       if (price%100 === 0) {
             return '￥'+String(price/100)+".00";
       } else if(price%10 === 0) {
           return '￥'+String(price/100)+"0";
       } else {
             return '￥'+String(price/100);
       }
   }
   //无符号价格转换
   static UnPriceToString = (price) =>{
       if (price%100 === 0) {
           return String(price/100)+".00";
       } else if(price%10 === 0) {
           return String(price/100)+"0";
       } else {
           return String(price/100);
       }
   }
}
/**
 * Created by dengfuming on 2018/4/27.
 */
import {ToastAndroid} from 'react-native';
import {FetchHeaderModule} from './NativeModul';
import JsonUitl from './JsonUitl';
import {fetchLoadingVisible} from "../actions/CommonAction";
var headers ={};
let mStore ;
export default class FetchUtil{

    static initHeaders(store){
        headers.Accept="application/json";
        headers["Content-Type"]="application/json";
        FetchUtil.getProtocolVersion();
        FetchUtil.getDeviceId();
        FetchUtil.getProductVersion();
        FetchUtil.getOperatorId();
        FetchUtil.getToken();
        mStore = store

    }

    static getProtocolVersion = ()=>{
        headers.ProtocolVersion = "4.2";
    }

    static getDeviceId = ()=>{
        headers.DeviceId = "862602018025726";
    }

    static getProductVersion = ()=>{
        headers.ProductVersion =  "5.9.0Z500H1";
    }

    static getSerialNo = ()=>{
        headers.SerialNo =  "0123456789ABCDEF";
    }


    static getOperatorId = ()=>{
        headers.OperatorId =  "1634";
    }

    static getToken = ()=>{
        headers.token = "f21bc197-052e-435b-8883-6e3d29a377f7";
    }

    init(){
        this.url           = '';
        this.method        = 'POST';
        this.headers        =headers;
        this.body_type     = 'json';
        this.bodys         = {};
        this.credentials   = 'omit';
        this.return_type   = 'json';
        this.overtime      = 0;
        this.reponse     = undefined;
        this.show = false;
        return this;
    }

    showDialog(show:boolean,title:string){
        this.show = show;
        if (show) {
            mStore.dispatch(fetchLoadingVisible(true,title));
        }
        return this;
    }

    setUrl(url){
        this.url= url ;
        return this;
    }

    setMethod(val){
        this.method = val;
        return this;
    }

    setBodyType(val){
        this.body_type = val;
        return this;
    }

    setReturnType(val){
        this.return_type = val;
        return this;
    }

    setOvertime(val){
        this.overtime = val;
        return this;
    }

    setHeader(name, val=null){
        if(typeof name == 'string'){
            this.headers[name] = val;
        }else if(typeof name == 'object'){
            Object.keys(name).map((index)=>{
                this.headers[index] = name[index];
            });
        }

        return this;
    }

    setBody(name, val=null){
        if(typeof name == 'string'){
            this.bodys[name] = val;
        }else if(typeof name == 'object'){
            Object.keys(name).map((index)=>{
                this.bodys[index] = name[index];
            });
        }
        return this;
    }

    setCookieOrigin(){
        this.credentials = 'same-origin';
        return this;
    }

    setCookieCors(){
        this.credentials = 'include';
        return this;
    }

    onResponse(then) {
        this.reponse = then;
        return this;
    }

    dofetch(){
        let options         = {};
        options.method      = this.method;
        options.credentials = this.credentials;

        options.headers = this.headers;

        if({} != this.bodys && this.method != 'GET'){
            if('form' == this.body_type){
                this.setHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
                let data = '';
                Object.keys(this.bodys).map((index) => {
                    let param = encodeURI(this.bodys[index]);
                    data += `${index}=${param}&`;
                });
                options.body = data;
            }else if('file' == this.body_type){
                let data = new FormData();
                Object.keys(this.bodys).map((index) => {
                    data.append(index, this.bodys[index]);
                });
                options.body = data;
            }else if('json' == this.body_type){
                options.body = JSON.stringify(this.bodys);
            }
        }

        return Promise.race([
            fetch(this.url,options),
            new Promise((resolve, reject) => {
                setTimeout(() => reject(new Error('request timeout')), this.overtime ? this.overtime : 30 * 1000);
            })
        ]).then(
            (response) => {
                if('json' == this.return_type){
                    return response.json();
                }else if('text' == this.return_type){
                    return response.text();
                }else if('blob' == this.return_type){
                    return response.blob();
                }else if('formData' == this.return_type){
                    return response.formData();
                }else if('arrayBuffer' == this.return_type){
                    return response.arrayBuffer();
                }
            }
        ).then(
            (response) => {
                if (this.show){
                    mStore.dispatch(fetchLoadingVisible(false,""));
                    this.show = false;
                }
                if (this.reponse) {
                    let success = this.reponse(response);
                    if (!success) {
                        switch (response.code){
                            case '4000':
                                ToastAndroid.show(response.reason,ToastAndroid.LONG);
                                break;
                            case '4001':
                                break;
                            case '4002':
                                this.onTimeout(response.reason);
                                break;
                            case '4003':
                                this.onUnbind();
                                break;
                            default:
                                if((response.reason.length != 0) && response.code > 100000) {
                                    ToastAndroid.show(response.reason,ToastAndroid.LONG);
                            }
                        }
                        }
                    }
                return response;
            }
        );
    }

    //超时处理
    onTimeout =(reason) =>{
        FetchHeaderModule.onTimeout(reason);
    }

    onUnbind =() =>{
        FetchHeaderModule.onUnbind();
    }

}


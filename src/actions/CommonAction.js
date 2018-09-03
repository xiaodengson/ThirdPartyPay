/**
 * Created by dengfuming on 2018/8/10.
 */
export const FETCH_LOADING_VISIBLE = 'FETCH_LOADING_VISIBLE';

export const fetchLoadingVisible = (visible:boolean,title:string = "正在获取数据")=>{
    return{
        type:FETCH_LOADING_VISIBLE,
        visible,
        title
    }
}
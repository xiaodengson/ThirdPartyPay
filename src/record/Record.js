/**
 * Created by dengfuming on 2018/8/20.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    ToastAndroid,
    View
} from 'react-native';
import {Tabs} from 'antd-mobile-rn';
import {scaleSize, setSpText} from "../util/ScreenUtils";
import RecordList from "./RecordList";
import {clearOrderDetailList, getRecordList} from "../actions/RecordAction";
import {connect} from "react-redux";
class Record extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
        this.tabs=[
            {title:"全部"},
            {title:"待支付"},
            {title:"支付成功"},
            {title:"支付失败"},
            {title:"退款中"},
            {title:"退款成功"},
            {title:"退款失败"},];
        this.pages = [];
    }

    componentWillMount() {
        const {navigate} = this.props.navigation;
        this.tabs.map((i,index)=>{
            this.pages.push(<RecordList status={index} navigate={navigate}/>);
        })
    }

    componentDidMount() {//第一次渲染完获取默认数据
        const {getRecordList} = this.props;
        getRecordList(1,0,true);
    }

    onTabClick = (tab: Object, index: number)=>{
        const {getRecordList} = this.props;
        getRecordList(1,index,true);
    }

    componentWillUnmount() {
        const {clearOrderDetailList} = this.props;
        clearOrderDetailList();
    }

    render(){
        return(
            <View style={styles.record}>
                <Tabs tabs={this.tabs} initialPage={0}
                      tabBarActiveTextColor="#2888ff"
                      tabBarInactiveTextColor="#CACACA"
                      swipeable={false}
                      prerenderingSiblingsNumber={0}
                      onTabClick={(tab, index)=>this.onTabClick(tab, index)}
                >
                    {this.pages}
                </Tabs>
            </View>
        );
    }
}
const mapStateToProps = state => ({

})

const mapDispatchToProps = (dispatch) =>({
    getRecordList:(page,status,showDialog)=>dispatch(getRecordList(page,status,showDialog)),
    clearOrderDetailList:()=>dispatch(clearOrderDetailList())
})

export default connect(mapStateToProps,mapDispatchToProps)(Record);
const styles = StyleSheet.create({
    record:{
        flex:1,
        paddingLeft:scaleSize(10),
        paddingRight:scaleSize(10)
    }
});
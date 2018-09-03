/**
 * Created by dengfuming on 2018/8/20.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    TouchableOpacity
} from 'react-native';
import Item from "./Item";
import PropTypes from "prop-types";
import EmptyLoading from "./EmptyLoading";
import {connect} from "react-redux";
import {getRecordList} from "../actions/RecordAction";
import BottomLoading from "../commonView/BottomLoading";
class RecordList extends Component {

    static propTypes ={
        status:PropTypes.number,
        navigate:PropTypes.func
    }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
    }


    _renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => this.onClick(item)}>
                <Item item={item}/>
            </TouchableOpacity>
        );
    }

    ItemSeparator = () => {
        return (
            <View style={styles.itemSeparator}/>
        );
    }

    onClick = (item)=>{
        const {navigate} = this.props;
        navigate('RecordDetail',{tradeId:item.tradeId})
    }

    listFooter=()=>{
        const {list,hasNext} = this.props;
        return (
            (list.length > 0) ? <BottomLoading hasNext={hasNext}/> : null
        );
    }

    onEndReached=()=>{
        const {getRecordList,status,hasNext,page} = this.props;
        if (hasNext){
            let mPage = page+1;
            getRecordList(mPage,status,false);
        }
    }



    render(){
        const {list,status,tabIndex} = this.props;
        return(
            <View style={{flex:1}}>
                {(status == tabIndex)?<FlatList
                    data={list}
                    renderItem={this._renderItem}
                    initialNumToRender={5}
                    ItemSeparatorComponent={this.ItemSeparator}
                    onEndReachedThreshold={0.02}
                    onEndReached={this.onEndReached}
                    ListFooterComponent={this.listFooter()}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={({index})=>("key"+index+"status:"+status)}
                    ListEmptyComponent={()=>{return(<EmptyLoading/>)}}/>:null}

            </View>
        );
    }
}

const mapStateToProps = state => ({
    list:state.record.list,
    tabIndex:state.record.tabIndex,
    page:state.record.page,
    hasNext:state.record.hasNext
})

const mapDispatchToProps = (dispatch) =>({
    getRecordList:(page,status,showDialog)=>dispatch(getRecordList(page,status,showDialog))
})

export default connect(mapStateToProps,mapDispatchToProps)(RecordList);
const styles = StyleSheet.create({
    itemSeparator:{
        flex: 1,
        height: 10,
        backgroundColor: 'transparent'
    }
});
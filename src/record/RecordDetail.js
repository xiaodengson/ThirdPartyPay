/**
 * Created by dengfuming on 2018/8/21.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    SectionList,
    TouchableOpacity
} from 'react-native';
import {scaleSize, screenW, setSpText} from "../util/ScreenUtils";
import connect from "react-redux/es/connect/connect";
import {clearOrderDetail, getOrderDetail, showRefundDialog} from "../actions/RecordAction";
import RefundDialog from "./RefundDialog";
class RecordDetail extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    componentWillMount(){
        const {getOrderDetail,clearOrderDetail} = this.props;
        const {tradeId} = this.props.navigation.state.params;
        clearOrderDetail();
        getOrderDetail(tradeId);
    }

    renderItem = ({item,section})=>{
        return(
            <View>
                {(section.key == "备注")?
                    <View style={styles.item}>
                        <Text style={styles.textRemark}>{item.description}</Text>
                        <View style={{width:2}}/>
                        <Text style={styles.textRemark}>{item.value}</Text>
                    </View>:
                    <View style={styles.item}>
                        <Text style={styles.textItem}>{item.description}</Text>
                        <View style={{flex:1}}/>
                        <Text style={styles.textItem}>{item.value}</Text>
                    </View>
                }
            </View>
        );
    }
    listHeader =()=>{
        const {header}= this.props;
        return(
            <View style={styles.viewHeader}>
                <Text style={[styles.textHeader,{color:'#a8a8a8'}]}>{header.paymentChannel}</Text>
                <Text style={styles.orderFee}>{header.orderFee}</Text>
                <Text style={styles.textHeader}>{header.paymentStatus}</Text>
                <Text style={[styles.textHeader,{height:(header.reason == "")?0:scaleSize(100)}]}>{header.reason}</Text>
            </View>
        );
    }

    renderSectionHeader =({section})=>{
        return(
            <View style={styles.sectionHeader}>
                <View style={styles.line}/>
                <Text style={styles.textTitle}>{(section.key == "备注")?null:section.key}</Text>
                <View style={styles.line}/>
            </View>
        );
    }

    refund = ()=>{
        const {showRefundDialog} = this.props;
        showRefundDialog(true)
    }

    render(){
        const {detailList,showRefund} = this.props;
        const {tradeId} = this.props.navigation.state.params;
        return(
        <View style={{flex:1}}>
            <View style={styles.detail}>
                <SectionList
                    sections={detailList}
                    renderItem={this.renderItem}
                    renderSectionHeader = {this.renderSectionHeader}
                    ListHeaderComponent={this.listHeader}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(index)=>("index"+index)}
                />
            </View>
            {
                (showRefund)?
                    <View style={styles.viewRefundButton}>
                        <TouchableOpacity style={styles.refundButton} onPress={()=>this.refund()}>
                            <Text style={{fontSize:setSpText(8),color:'white'}}>退款</Text>
                        </TouchableOpacity>
                    </View>
                    :null
            }
            <RefundDialog tradeId={tradeId}/>
        </View>


        );
    }
}
const mapStateToProps = state => ({
    detailList:state.record.detailList,
    header:state.record.header,
    showRefund:state.record.showRefund
})

const mapDispatchToProps = (dispatch) =>({
    getOrderDetail:(tradeId)=>dispatch(getOrderDetail(tradeId)),
    clearOrderDetail:()=>dispatch(clearOrderDetail()),
    showRefundDialog:(visible)=>dispatch(showRefundDialog(visible))
})
export default connect(mapStateToProps,mapDispatchToProps)(RecordDetail);

const styles = StyleSheet.create({
    detail:{
        flex:1,
        backgroundColor:"#f8f8f8",
        padding:scaleSize(40),
        alignItems:'center'
    },
    item:{
        width:screenW-scaleSize(80),
        height:scaleSize(60),
        flexDirection:'row',
        alignItems:'center',
    },
    textItem:{
        fontSize:setSpText(6),
        color:'#2f2f2f',
        alignSelf:'center',
    },
    line:{
        flex:1,
        height:scaleSize(1),
        backgroundColor:'#a8a8a8'
    },
    textTitle:{
        fontSize:setSpText(8),
        textAlignVertical:'center',
        color:'#a8a8a8'
    },
    viewHeader:{
        flex:1,
        padding:scaleSize(30),
        justifyContent:'center',
        alignItems:'center'
    },
    textHeader:{
        fontSize:setSpText(8),
        color:'#000000',
        textAlignVertical:'center',
        height:scaleSize(100),
    },
    orderFee:{
        fontSize:setSpText(15),
        color:'#000000',
        textAlignVertical:'center',
        height:scaleSize(100),
    },
    sectionHeader:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    textRemark:{
        fontSize:setSpText(5),
        color:'#a8a8a8',
        textAlignVertical:'center',
    },
    refundButton:{
        width:scaleSize(600),
        height: scaleSize(100),
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"#10a1f1",
        borderRadius:scaleSize(10)
    },
    viewRefundButton:{
        height:scaleSize(160),
        width: screenW,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:0,
        backgroundColor: "#e9e9e9",
    }
});
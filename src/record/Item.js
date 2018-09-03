/**
 * Created by dengfuming on 2018/8/20.
 */
import React, {PureComponent} from 'react';
import {
    StyleSheet, Text,
    View
} from 'react-native';
import PriceUtil from "../util/PriceUtil"
import {scaleSize,setSpText} from "../util/ScreenUtils";
import PropTypes from "prop-types";
export default class Item extends PureComponent {

    static propTypes = {
        item:PropTypes.object
    }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render(){
        const {item} = this.props;
        return(
            <View style={styles.item}>
                <View style={styles.itemView}>
                    <Text style={styles.itemText}>{"NO:"+item.tradeId}</Text>
                    <View style={{flex:1}}/>
                    <Text style={styles.itemText}>{item.channel.value+">"}</Text>
                </View>
                <View style={styles.line}/>
                <View style={styles.itemView}>
                    <Text style={styles.itemText}>{"订单金额:"+PriceUtil.priceToString(item.totalFee)}</Text>
                    <View style={{flex:1}}/>
                    <Text style={styles.itemText}>{item.paymentStatus.value}</Text>
                </View>
                <View style={styles.itemView}>
                    <Text style={styles.itemText}>{"实收金额:"+PriceUtil.priceToString(item.receiptFee)}</Text>
                    <View style={{flex:1}}/>
                    <Text style={styles.itemText}>{PriceUtil.formatDateTime(item.timestamp)}</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    item:{
        padding:scaleSize(20),
        justifyContent:'center',
        height:scaleSize(260),
        borderRadius:scaleSize(20),
        backgroundColor:'white'
    },
    itemView:{
        height:scaleSize(65),
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    line:{
        height:1,
        backgroundColor:"#d0d0d0",
        marginBottom:scaleSize(20)
    },
    itemText:{
        fontSize:setSpText(6),
        alignSelf: 'center',
        color:'#909090'
    },
});
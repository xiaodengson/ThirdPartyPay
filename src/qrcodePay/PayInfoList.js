/**
 * Created by dengfuming on 2018/8/10.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    View
} from 'react-native';
import {scaleSize, setSpText} from "../util/ScreenUtils";
import PropTypes from "prop-types";

export default class PayInfoList extends Component {
    static propTypes = {
        payList:PropTypes.array,
        realAmount:PropTypes.string
    }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    renderItem=({item})=>{
        return(
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.left}</Text>
                <View style={{flex:1}}/>
                <Text style={styles.textItem}>{item.right}</Text>
            </View>
        )
    }

    render(){
        const {payList,realAmount} = this.props;
        return(
            <View style={styles.infoList}>
                <Text style={styles.price}>{realAmount}</Text>
                <FlatList
                    data={payList}
                    renderItem={this.renderItem}
                    keyExtractor={({index})=>("index"+index)}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    infoList:{
        flex:1,
        padding:scaleSize(40),
        backgroundColor:"#f8f8f8"
    },
    item:{
        height:scaleSize(80),
        borderTopWidth:scaleSize(1),
        borderBottomWidth:scaleSize(1),
        borderColor:'#d0d0d0',
        flexDirection:'row',
        alignItems:'center',
    },
    textItem:{
        fontSize:setSpText(6),
        color:'#000000',
        alignSelf:'center',
    },
    price:{
        fontSize:setSpText(16),
        marginTop: scaleSize(30),
        marginBottom: scaleSize(30),
        textAlign:'left',
        color:'#000000'
    }
});
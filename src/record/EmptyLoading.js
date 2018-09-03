/**
 * Created by dengfuming on 2017/12/12.
 */
import React, {Component} from 'react';
import {
    ActivityIndicator, Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {scaleSize, screenW} from "./../util/ScreenUtils";
export default class EmptyLoading extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render(){
        return(
            <View style={styles.viewLoad}>
                <Image style={styles.imageCat} source={require('../../resources/zhangbei_logo_mao.png')}/>
                <Text style={styles.textLoad}>更多数据请在商户后台获取</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    viewLoad: {
        justifyContent: "center",
        alignItems: "center",
        width: screenW,
        height: scaleSize(200)
    },
    textLoad: {
        fontSize: scaleSize(30),
        color: "#bfbfbf",
        marginLeft: scaleSize(10)
    },
    imageCat: {
        height: scaleSize(100),
        width: scaleSize(120),
        resizeMode: "stretch",
    },
});
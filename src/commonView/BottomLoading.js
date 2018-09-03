/**
 * Created by dengfuming on 2017/11/17.
 * 底部加载组件
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator
} from 'react-native';
import {scaleSize, screenW, screenH} from "../util/ScreenUtils";

export default class BottomLoading extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
        this.hasNext = this.props.hasNext;//bool
    }

    componentWillReceiveProps(nextProps) {
        this.hasNext = nextProps.hasNext;
    }


    render() {
        return (
            (this.hasNext) ?
                <View style={styles.viewLoad}>
                    <ActivityIndicator size="small" color="#6BD3FF"/><Text style={styles.textLoad}>正在加载...</Text>
                </View>
                : <View style={styles.viewNoMore}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <View style={styles.viewLine}/>
                    <Image style={styles.imageCat} source={require('../../resources/zhangbei_logo_mao.png')}/>
                    <View style={styles.viewLine}/>
                </View >
                <Text style={styles.textLoad}>没有更多数据了</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    image: {
        height: scaleSize(60),
        width: scaleSize(60),
        resizeMode: "stretch",
    },
    textLoad: {
        fontSize: scaleSize(30),
        color: "#bfbfbf",
        marginLeft: scaleSize(10)
    },
    viewLoad: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: screenW,
        height: scaleSize(100)
    },
    viewNoMore: {
        justifyContent: "center",
        alignItems: "center",
        width: screenW,
        height: scaleSize(200),
        padding: scaleSize(10)
    },
    imageCat: {
        height: scaleSize(100),
        width: scaleSize(120),
        resizeMode: "stretch",
    },
    viewLine: {
        flex: 1,
        backgroundColor: "#bfbfbf",
        height: 1,
    }
});
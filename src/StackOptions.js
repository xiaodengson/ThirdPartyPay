/**
 * Created by dengfuming on 2017/9/4.
 * StackNavigator 导航栏
 */
import {scaleSize} from '../src/util/ScreenUtils';
import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    View
} from 'react-native';
const StackOptions = ({navigation}, title = null, showTitle = false, leftTitle = "返回", showLeft = true, rightTitle = "", showRight = false,
                      rightClick = () => {}) => {
    let headerTitle = showTitle ? title : null;
    let headerBackColor = '#2888ff';//(navigation.state.params.data) ? navigation.state.params.data.color :
    let headerStyle = {height: scaleSize(100), backgroundColor: headerBackColor};
    let headerTitleStyle = styles.titleText;
    let headerRight = showRight ? (
        <TouchableOpacity onPress={() => rightClick(navigation)} style={styles.headerRight}>
            <Text style={styles.rightText}>{rightTitle}</Text>
        </TouchableOpacity>
    ) : <View style={{height: scaleSize(60), width: scaleSize(200)}}></View>;
    let headerLeft = (
        <TouchableOpacity style={styles.headerLeft} onPress={() => {
            navigation.goBack()
        }}>
            <Image
                source={require('../resources/back.png')}
                style={styles.leftImage}
            />
            {showLeft ? <Text style={styles.leftText}>{leftTitle}</Text> : null}
        </TouchableOpacity>
    );

    return {headerTitle, headerStyle, headerLeft,headerRight,headerTitleStyle};
};

const styles = StyleSheet.create({

    // header:{
    //     height: scaleSize(80),
    //     backgroundColor:headerBackColor
    // },
    headerLeft: {
        width: scaleSize(250),
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerRight: {
        height: scaleSize(60),
        width: scaleSize(200),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2a6cfc',
        borderRadius: scaleSize(10),
        marginRight: scaleSize(10),
    },
    titleText: {
        fontSize: scaleSize(30),
        color: 'white',
        alignSelf: 'center'
    },
    leftText: {
        fontSize: scaleSize(30),
        color: 'white'
    },
    leftImage: {
        height: scaleSize(40),
        width: scaleSize(40),
        resizeMode: 'stretch',
        marginLeft: scaleSize(20),
    },
    rightText: {
        color: '#fefefe',
        alignSelf: 'center',
        fontSize: scaleSize(30),
    },
});
export default StackOptions;
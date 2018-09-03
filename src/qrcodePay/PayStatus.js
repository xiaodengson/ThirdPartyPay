/**
 * Created by dengfuming on 2018/8/10.
 */
import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    ActivityIndicator,
    View
} from 'react-native';
import {scaleSize, screenW, setSpText} from "../util/ScreenUtils";
import PropTypes from "prop-types";
import QRCode from 'react-native-qrcode';

export default class PayStatus extends Component {

    static propTypes = {
        payStatus:PropTypes.string,
        errorReason:PropTypes.string,
        title:PropTypes.string,
        url:PropTypes.string,
        imageUrl:PropTypes.number
    }

    static defaultProps = {
        payStatus:"",
        errorReason:"",
        url:"",
        imageUrl:0
    }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
    }


    render(){
        const {payStatus,imageUrl,errorReason,title,url} = this.props;
        return(
            <View style={styles.statusView}>
                <Text style={styles.text}>{title}</Text>
                {(url != "" && payStatus == "") ?
                    <View style={{marginTop: scaleSize(20)}}>
                        <QRCode value={url} size={scaleSize(350)} bgColor='black' fgColor='white'/>
                    </View> : null
                }
                {(payStatus != "") ?
                    <View >
                        <Image style={styles.statusImage} source={imageUrl}/>
                        <Text style={[styles.text, {marginTop: scaleSize(40),marginBottom:scaleSize(40)}]}>{payStatus}</Text>
                        <Text style={[styles.text, {fontSize: (errorReason == '') ? 0 : setSpText(6)}]}>{errorReason}</Text>
                    </View> : null}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    statusView:{
        borderRadius:scaleSize(10),
        width:screenW,
        height:scaleSize(500),
        padding: scaleSize(50),
        backgroundColor:'white',
        alignItems:'center',
    },
    statusImage:{
        resizeMode:'stretch',
        marginTop: scaleSize(20),
        height:scaleSize(160),
        width:scaleSize(160),
    },
    text:{
        fontSize:setSpText(6),
        alignSelf: 'center',
        color:'#000000'
    }
});
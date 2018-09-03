/**
 * Created by dengfuming on 2018/8/6.
 */
import React, {Component} from 'react';
import {
    Image,
    StyleSheet, Text, TouchableOpacity,
    View
} from 'react-native';
import {scaleSize,setSpText} from '../../src/util/ScreenUtils';

export default class ImageText extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render(){
        const {title,clickable,image, onPress} = this.props;
        return(
            <TouchableOpacity style={styles.view} disabled={!clickable} onPress={()=>{onPress()}}>
                <Image style={[styles.image,{tintColor:clickable?'#ffffff':'#a8d4f1'}]} source={image}/>
                <Text style={[styles.text,{color:clickable?'#ffffff':'#a8d4f1'}]}>{title}</Text>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    view:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'flex-start',
        height:scaleSize(80)
    },
    image:{
        resizeMode:'stretch',
        height:scaleSize(30),
        width:scaleSize(30),
    },
    text:{
        color:'white',
        marginLeft:scaleSize(10) ,
        fontSize:setSpText(8)
    },
});
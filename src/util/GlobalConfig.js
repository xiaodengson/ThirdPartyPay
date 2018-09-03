/**
 * Created by zjq on 2017/7/18.
 * 全局配置信息
 */
import React, {Component} from 'react';
import {
    Dimensions,
    PixelRatio
} from 'react-native';
let{width, height} = Dimensions.get('window');
let pixel = PixelRatio.get();
var GLOBAL = {
    WIDTH:width,//屏幕宽度
    HEIGHT:height,//屏幕高度
    PIXEL:pixel//像素密度占比

};
export default GLOBAL;
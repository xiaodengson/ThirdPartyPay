/**
 * Created by zjq on 2017/7/18.
 */
import React, {Component} from 'react';
import {
    Dimensions,
    PixelRatio
} from 'react-native';
var screenW = Dimensions.get('window').width;
var screenH = Dimensions.get('window').height;
var fontScale = PixelRatio.getFontScale();
var pixelRatio = PixelRatio.get();

const w2 = 750/pixelRatio;//以iphone6为标准
const h2 = 1334/pixelRatio;
/**
 * 设置text为sp
 * @param size  sp
 * @returns {Number} dp
 */

function setSpText(size:number) {
    var scaleWidth = screenW / w2;
    var scaleHeight = screenH / h2;
    var scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5) * pixelRatio / fontScale);
    return size;
}
/**
 * 屏幕适配,缩放size
 * @param size
 * @returns {Number}
 * @constructor
 */
 function scaleSize(size:number) {
    var scaleWidth = screenW / w2;
    var scaleHeight = screenH / h2;
    var scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5));
    return size/pixelRatio;
}
module.exports = {screenW,screenH,pixelRatio,setSpText,scaleSize};
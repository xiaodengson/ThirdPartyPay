/**
 * Created by dengfuming on 2018/8/10.
 */
import React, {Component} from 'react';
import {
    Modal,
    StyleSheet, Text, TextInput, TouchableOpacity,
    View
} from 'react-native';
import {scaleSize, screenH, screenW, setSpText} from "../util/ScreenUtils";
import {connect} from "react-redux";
import {remarkText, remarkVisible} from "../actions/HomeAction";
import PropTypes from "prop-types";
 class RemarkModal extends Component {

     static propTypes = {
         defaultText:PropTypes.string,
     }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
        this.text = "";
    }

    closeModal = (type:string)=>{

        const {remarkVisible,remarkText} = this.props;

        switch (type){
            case "cancel":
                remarkVisible(false);
                remarkText("备注:")
                break;
            case "ok":
                remarkVisible(false);
                if (this.text ===""){
                    remarkText("备注:")
                }else {
                    remarkText(this.text)
                }
                break
        }

    }

    onChangeText =(text)=>{
        this.text= text;
    }

    onShow = ()=>{
        this.text="";
    }


    render(){
        const {visible ,defaultText} = this.props;
        return(
            <Modal
                visible={visible}
                onRequestClose={()=>{}}
                transparent={true}
                onShow={()=>this.onShow()}>
                <View style={{width:screenW,height:screenH,alignItems: 'center',justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                    <View style={styles.modal}>
                        <TextInput
                            style={styles.textInput}
                            placeholder={defaultText}
                            placeholderTextColor='#909090'
                            underlineColorAndroid='#468C7A'
                            autoFocus={true}
                            onChangeText={(text)=>this.onChangeText(text)}/>
                        <View style={{height:scaleSize(200), backgroundColor:'#d0d0d0'}}>

                        </View>
                        <View style={styles.modalBottom}>
                            <TouchableOpacity style={styles.modalButton} onPress={()=>this.closeModal("cancel")}>
                                <Text style={styles.textButton}>取消</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={()=>this.closeModal("ok")}>
                                <Text style={styles.textButton}>确定</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
const mapStateToProps = state => ({
    remark:state.home.remark,
    visible:state.home.remarkVisible
})

const mapDispatchToProps = (dispatch) =>({
    remarkVisible:(visible)=>dispatch(remarkVisible(visible)),
    remarkText:(text)=>dispatch(remarkText(text))
})

export default connect(mapStateToProps,mapDispatchToProps)(RemarkModal)

const styles = StyleSheet.create({
    modal:{
        borderRadius:scaleSize(10),
        backgroundColor:'white',
    },
    modalBottom:{
        flexDirection:'row',
    },
    modalButton:{
        width:2*screenW/5,
        height:scaleSize(80),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:scaleSize(1),
        borderColor:'#d0d0d0',
        borderBottomLeftRadius:scaleSize(10),
        borderBottomRightRadius:scaleSize(10),
        backgroundColor:'white',
    },
    textButton:{
        fontSize:setSpText(8),

        alignSelf:'center',
        color:'#000000'
    },
    textInput:{
        fontSize:setSpText(8),
        margin:scaleSize(12)
    }
});
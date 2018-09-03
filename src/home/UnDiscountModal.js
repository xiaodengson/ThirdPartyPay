/**
 * Created by dengfuming on 2018/8/7.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Modal,
    TextInput,
    TouchableOpacity,
    Text,
} from 'react-native';
import {scaleSize,screenW,screenH,setSpText} from '../util/ScreenUtils'
import {connect} from "react-redux";
import {undiscountAmount, undiscountVisible, undiscountWarn} from "../actions/HomeAction";
import PropTypes from "prop-types";
class UnDiscountModal extends Component {

    static propTypes = {
        defaultText:PropTypes.string,
    }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.text = "";
    }

    closeModal = (type:string)=>{

        const {undiscountVisible,undiscountAmount,undiscountWarn,showWarn} = this.props;
        switch (type){
            case "cancel":
                undiscountVisible(false);
                undiscountAmount("添加不可优惠金额");
                break;
            case "ok":
                undiscountVisible(false);
                if (this.text ===""|| showWarn){
                    undiscountAmount("添加不可优惠金额");
                }else {
                    undiscountAmount(this.text);
                }
                break
        }
        undiscountWarn(false);

    }

    onChangeText =(text)=>{
        const {amount,undiscountWarn} = this.props;
        this.text= text;
        let price = parseFloat(text);

        if (price>parseFloat(amount)){
            undiscountWarn(true);
        }else {
            undiscountWarn(false);
        }
    }

    onShow = ()=>{
        this.text="";
    }


    render(){
        const {visible ,defaultText,showWarn} = this.props;
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
                            keyboardType='numeric'
                            autoFocus={true}
                            onChangeText={(text)=>this.onChangeText(text)}/>
                        <Text style={[styles.textWarn,{fontSize:(showWarn)?setSpText(4):0}]}>不可优惠金额不能大于订单金额</Text>
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
    amount:state.home.amount,
    visible:state.home.undiscountvisible,
    showWarn:state.home.showWarn
})

const mapDispatchToProps = (dispatch) =>({
    undiscountVisible:(visible)=>dispatch(undiscountVisible(visible)),
    undiscountAmount:(text)=>dispatch(undiscountAmount(text)),
    undiscountWarn:(show)=>dispatch(undiscountWarn(show))
})

export default connect(mapStateToProps,mapDispatchToProps)(UnDiscountModal)

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
    textWarn:{
        color:"#cc2311",
        alignSelf:'center',
        marginBottom:scaleSize(10)
    },
    textInput:{
        fontSize:setSpText(8),
        margin:scaleSize(12)
    }

});
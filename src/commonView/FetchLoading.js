/**
 * Created by dengfuming on 2018/8/10.
 */
import React, {Component} from 'react';
import {
    Modal,
    StyleSheet,
    View,
    ActivityIndicator, Text,
} from 'react-native';
import {scaleSize, screenH, screenW, setSpText} from "../util/ScreenUtils";
import {connect} from "react-redux";
import {fetchLoadingVisible} from "../actions/CommonAction";
import PropTypes from "prop-types";
class FetchLoading extends Component {

    // static propTypes = {
    //     title:PropTypes.string,
    // }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
    }

    onBackPress =()=>{
        const {fetchLoadingVisible} = this.props;
        fetchLoadingVisible(false);
    }

    render(){
        const {visible ,title} = this.props;
        return(
            <Modal
                visible={visible}
                onRequestClose={()=>this.onBackPress()}
                transparent={true}>
                <View style={{width:screenW,height:screenH,alignItems: 'center',justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                    <View style={styles.modal}>
                        <ActivityIndicator size={'large'} />
                        <Text style={styles.loadingTitle}>{title}</Text>
                    </View>
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    visible:state.common.loadingVisible,
    title:state.common.title
})
const mapDispatchToProps = (dispatch) =>({
    fetchLoadingVisible:(visible)=>dispatch(fetchLoadingVisible(visible))
})
export default connect(mapStateToProps,mapDispatchToProps)(FetchLoading)

const styles = StyleSheet.create({
    modal:{
        borderRadius:scaleSize(10),
        width:4*screenW/5,
        height:scaleSize(250),
        padding: scaleSize(20),
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center'
    },

    loadingTitle:{
        fontSize:setSpText(8),
        alignSelf:'center',
        color:'#000000',
        marginTop:scaleSize(50)
    },
});
/**
 * Created by dengfuming on 2018/8/6.
 */
import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {screenW,screenH,scaleSize,setSpText} from '../../src/util/ScreenUtils';
import ImageText from './ImageText';
import NumberKeyBoard from "./NumberKeyBoard";
import { connect } from 'react-redux';
import UnDiscountModal from "./UnDiscountModal";
import {changeAmount, remarkText, remarkVisible, undiscountAmount, undiscountVisible} from "../actions/HomeAction";
import RemarkModal from "./RemarkModal";
import FetchLoading from "../commonView/FetchLoading";


class Home extends Component {
    // 构造
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {changeAmount,undiscountAmount,remarkText} = this.props;
        changeAmount("0",false);
        undiscountAmount("添加不可优惠金额");
        remarkText("备注:")
    }


    onPress=(type:string)=>{
        const {undiscountVisible,remarkVisible} = this.props;
        switch (type){
            case 'remark'://备注
                remarkVisible(true);
                break;
            case 'undiscount'://不可优惠金额
                undiscountVisible(true);
                break;
        }
    }

    render(){
        const {navigate} = this.props.navigation
        const {amount,clickable,undiscountPrice,remark} = this.props;
        return(
            <View style={{flex:1,position: 'absolute', left:0,}}>
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <ImageText title={remark} image = {require('../../resources/remark.png')} clickable = {true}
                                   onPress={()=>this.onPress('remark')}/>
                        <Text style={styles.textPrice}>{amount}</Text>
                    </View>
                    <ImageText title={undiscountPrice} image = {require('../../resources/undiscount.png')}
                               clickable = {clickable} onPress={()=>this.onPress('undiscount')}/>
                </View>
                <NumberKeyBoard navigate={navigate}/>
                <UnDiscountModal defaultText="请输入不可优惠金额"/>
                <RemarkModal defaultText="请输入交易备注"/>
                <FetchLoading />
            </View>
        );
    }
}
const mapStateToProps = state => ({
    amount:state.home.amount,
    clickable:state.home.clickable,
    undiscountPrice:state.home.undiscountPrice,
    remark:state.home.remark,
})

const mapDispatchToProps = (dispatch) =>({
    undiscountVisible:(visible)=>dispatch(undiscountVisible(visible)),
    remarkVisible:(visible)=>dispatch(remarkVisible(visible)),
    changeAmount:(amount,clickable)=>dispatch(changeAmount(amount,clickable)),
    undiscountAmount:(price)=>dispatch(undiscountAmount(price)),
    remarkText:(remark)=>dispatch(remarkText(remark))
})


export default connect(mapStateToProps,mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    header:{
        backgroundColor:'#10a1f1',
        flex:1,
        padding:scaleSize(10),

    },
    headerTop:{
        flex:1,
        margin:scaleSize(10),
        padding:scaleSize(20),
        backgroundColor:'#2888ff',
        borderRadius:scaleSize(5)
    },
    textPrice:{
        color:'white',
        marginTop: scaleSize(80),
        fontSize:setSpText(20)
    },
    headerBottom:{
        flexDirection:'row',
        alignItems:'center'
    }
});


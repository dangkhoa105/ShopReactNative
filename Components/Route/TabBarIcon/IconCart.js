import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';

import iconCart from '../../../Image/cart0.png'
import iconCart1 from '../../../Image/cart.png';

class Iconcart extends Component{
    constructor(props){
        super(props);
        // // this.state={
        // //     notifications:[{id:"1",name:"abc",money:"125"},{id:"1",name:"abc",money:"125"},{id:"1",name:"abc",money:"125"}],
        // }        
    }
    render(){
        const {focused, cartLeght, user} = this.props;
        return(
            <View style={{ position: "relative" ,
                flex: 1,
                alignSelf: 'stretch',
                // justifyContent: 'space-around',
                // alignItems: 'center'
            }}>
                {focused ? <Image source={iconCart1} style={{ width: 25, height: 25 }} /> : <Image source={iconCart} style={{ width: 25, height: 25 }} />}
                {cartLeght.length > 0 ?
                    <View style={{
                        width:14,
                        height:14,
                        position: "absolute",
                        top: 0,
                        right: 0,
                        borderRadius: 50,
                        backgroundColor: 'red',
                        justifyContent:'center',
                        alignItems:'center',
                    }}>
                        <Text style={{fontSize:12, color:'white'}}>{user ? cartLeght.length : null}</Text>
                    </View>
                    : undefined}
              </View>
        );
    }
} 
function mapStoreToProp(state){
    return {
        cartLeght: state.arrCart,
        user: state.isSignIn,
    };
}
export default connect(mapStoreToProp)(Iconcart);

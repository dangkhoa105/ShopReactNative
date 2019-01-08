import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import iconCart from '../../../Image/cart0.png'
import iconCart1 from '../../../Image/cart.png';

class Iconcart extends Component{
    constructor(props){
        super(props);   
    }
    render(){
        const { cartLeght, user } = this.props;
        return(
            <View style={{ position: "relative", alignSelf: 'stretch' }}>
            <TouchableOpacity onPress={this.props.goCar}>
                {<Image source={iconCart} style={{ width: 40, height: 40 }} />}
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
            </TouchableOpacity>             
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

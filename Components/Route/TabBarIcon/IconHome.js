import React, { Component } from 'react';
import { View, Image } from 'react-native';

import icCart1 from '../Icon/cart.png';

export default  class IconHome extends Component{
    constructor(props){
        super(props);
        this.state={
            focused: true
        }        
    }
    render(){
        return(
            <View style={{ position: "relative" ,
                zIndex: 0,
                flex: 1,
                alignSelf: 'stretch',
            }}>
                <Image source={icCart1} style={{width:25, height:25}}/>
                {/* {this.state.notifications.length > 0 ?
                    <View style={{
                        width:14,
                        height:14,
                        position: "absolute",
                        top: 0,
                        right: 0,
                        borderRadius: 50,
                        backgroundColor: 'red',
                        zIndex: 2,
                        justifyContent:'center',
                        alignItems:'center',
                    }}>
                        <Text style={{fontSize:12}}>{this.state.notifications.length}</Text>
                    </View>
                    : undefined} */}
              </View>
        );
    }
} 
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';
import iconMenu from '../../Image/menu.png';
import iconLogo from '../../Image/logo.png';
import search from '../../Redux/API/search';
import { searchProduct } from '../../Redux/Reducer/CreateAction';

class Header extends Component{
    render(){
        const { header, headerTop, imageMenu, hearderSearch, textinput, imageCart } = styles;
        return(
            <View style={header}>
                <View style={headerTop}>
                    <TouchableOpacity
                        onPress={this.props.onOpen}
                    >
                        <Image 
                            style={imageMenu}
                            source={iconMenu}
                        />
                    </TouchableOpacity>
                    <View style={hearderSearch}>                                                                     
                        <TextInput
                            underlineColorAndroid='transparent'
                            style={textinput}
                            placeholder="What do you want to buy ?"                      
                            onFocus={ this.props.goSear }                                                      
                        /> 
                    </View>
                    <Image 
                        style={imageCart}
                        source={iconLogo}
                    />
                </View>      
            </View>
        );
    }
}

export default  connect(null,{searchProduct})(Header);
var { width, height } = Dimensions.get('window');
const styles=StyleSheet.create({
    header: {
        backgroundColor: '#4895F0',
        justifyContent: 'space-around',
        padding: width / 25,
        paddingTop: width / 30,
        height: height / 12,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageMenu: {
        width: width / 15,
        height: height / 18,
        margin: width / 80,
    },
    imageCart: {
        width: width / 17,
        height: height / 20,
        marginRight: width / 32,
        marginTop: width / 100,
    },
    hearderSearch: {
        backgroundColor: 'white',
        marginTop: width / 100,
        justifyContent: 'space-around',
    },
    textinput: {
        backgroundColor: 'white',
        borderRadius: 10,
        height: height / 20,
        width: width / 1.6,
        paddingLeft: 10,
        paddingVertical: 1 
    },
})
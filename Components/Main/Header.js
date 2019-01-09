import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { searchProduct } from '../../Redux/Reducer/CreateAction';
import { SearchBar, Icon } from 'react-native-elements'
import colors from '../../Design/Color'
import IconCart from '../Route/TabBarIcon/IconCart';

class Header extends Component{
    render(){
        const { header, headerTop, hearderSearch } = styles;
        return(
            <View style={header}>
                <View style={headerTop}>
                    <Icon
                        name='menu'
                        type='MaterialIcons'
                        color='#ffffff'
                        size={45}
                        onPress={this.props.onOpen} 
                    />
                    <View style={hearderSearch}>                                                                     
                        <SearchBar
                            lightTheme
                            platform="android"
                            underlineColorAndroid='transparent'
                            placeholder="Search..."                      
                            onFocus={this.props.goSear}                                                      
                        /> 
                    </View>
                    <IconCart goCar={this.props.goCart}/>                  
                </View>      
            </View>
        );
    }
}

export default  connect(null,{searchProduct})(Header);
var { width, height } = Dimensions.get('window');
const styles=StyleSheet.create({
    header: {
        backgroundColor: colors.headerUI,
        justifyContent: 'space-around',
        padding: width / 25,
        paddingTop: width / 30,
        height: height / 11,
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
        height: height / 20,
        width: width / 1.6,
    },
    textinput: {
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center'
    },
})
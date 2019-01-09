import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Login from './Login';
import Registry from './Registry';
import { login, registry } from '../../Redux/Reducer/CreateAction';

import back from '../../Image/back_white.png';
import colors from '../../Design/Color';
import profile from '../../Image/logo.png';

class Authentication extends Component{
    goBackMenu() {
        this.props.navigation.navigate('First');
        this.props.navigation.navigate('DrawerOpen');
    }

    isLogin(){
        const { isLogin } = this.props;
        if( isLogin === 'REGISTRY') return <Registry/>
        return <Login goBackMenu = {this.goBackMenu.bind(this)}/>
    }

    isFilterLogin(statusname){
        if( statusname === this.props.isLogin ) return styles.buttontextBottom;
        return styles.buttontextBottomSignUp;
    }

    
    render() {
        const { isLogin } = this.props;
        const { container, bottom, header, iconStyle, buttonLeft, buttonRight, logo, logoStyle, buttontextBottom } = styles
        return (
            <View style={container}>               
                <View style={header}>
                    <View>
                        <TouchableOpacity
                            style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}
                            onPress={this.goBackMenu.bind(this)}
                        >
                            <Image style={iconStyle} source={back} />
                            <Text style={{color: colors.bannerUI, fontSize: 20}}>Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={logo}>
                    <Image style={logoStyle} source={profile} />
                </View>

                {this.isLogin()}

                <View style={bottom}>
                    <TouchableOpacity
                        style={[buttonLeft, this.isFilterLogin('LOGIN')]}
                        onPress={() => this.props.login()}
                    >
                        <Text>SIGN IN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[buttonRight, this.isFilterLogin('REGISTRY')]}
                        onPress={() => this.props.registry()}
                    >
                        <Text>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
function mapStoreToProp(state){
    return{
        isLogin : state.isLogin,
    };
}

export default connect(mapStoreToProp,{login,registry})(Authentication);

const {width, height} = Dimensions.get('window');
const imageWidth = width * 0.2;
const imageHeight = (imageWidth / 2000) * 2000;
const styles = StyleSheet.create({
    container: {
        //flex: 1,
        width: width,
        height: height,
        backgroundColor: colors.menuUI,
        padding: width / 25,
        padding: 20,
        justifyContent: "space-between"        
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        alignSelf: 'stretch'
    },
    iconStyle: {
        width: width / 13,
        height: height / 18,
    },
    inactiveStyle: {
        width: (width - 65) / 2,
        height: height * 0.07,
        backgroundColor: '#D7D7D7',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        marginRight: 1,
    },
    bottom: {
        //flex: 2,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 25,
    },
    buttonLeft: {
        width: (width - 65) / 2,
        height: height * 0.07,
        backgroundColor: '#FFECB3',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        marginRight: 1,
    },
    buttonRight: {
        width: (width - 65) / 2,
        height: height * 0.07,
        backgroundColor: '#FFECB3',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        marginRight: 1,
    },
    logo: {
        backgroundColor: colors.menuUI,
        alignItems: 'center',
    },
    logoStyle: {
        width: imageWidth * 1.6,
        height: imageHeight * 1.5,
        borderRadius: 100,
    },
    buttontextBottom: {
        backgroundColor: '#feca57'
    }
})
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, TextInput, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import changeInfoUser from '../../Redux/API/changeInfo';
import getToken from '../../Redux/API/getToken';

import back from '../../Image/backs.png';
import { Input, Icon } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/';
import colors from '../../Design/Color'


class ChangeInfo extends Component{
    constructor(props){
        super(props);
        const {user} = this.props
        this.state={
            name:user.name,
            address:user.address,
            phonenumber:user.phone,
        };
    }
    goBack(){
        this.props.navigation.navigate('First');
        this.props.navigation.navigate('DrawerOpen')
    }
    _changeInfo(){
        const {name, address, phonenumber} = this.state;
        getToken()
        .then(token => changeInfoUser(token, name, phonenumber, address))
        .then(() => this._ChangSuccess())
        .catch(err => console.log(err, "LOI"))
    }
    _ChangSuccess(){
        Alert.alert(
            'Change Info',
            'Update change info success',
            [
              {text: 'OK', onPress: () => this.goBack()},
            ],
          )
    }
    phoneNumberOnlyNumeric(text){
        let newText = '';
        let numbers = '0123456789';
    
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                alert("please enter numbers only");
            }
        }
        this.setState({ phonenumber: newText });
    }
    render(){
        const { container, header, body, iconStyle, textHeaderStyle, textInputStyle, button, buttontext } = styles
        const { name, address, phonenumber } = this.state;
        return(
            <View style={container}>
                <View style={header}>
                    <Text style={textHeaderStyle}></Text>
                    <Text style={textHeaderStyle}>User Infomation</Text>
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <Image style={iconStyle} source={back} />
                    </TouchableOpacity>
                </View>
                <View style={body}>
                    <View style={textInputStyle}>
                        <Input
                            placeholder='Enter your name'
                            placeholderTextColor={colors.white}
                            leftIcon={{
                                type: 'font-awesome',
                                name: 'user',
                                size: 22,
                                color: colors.lightBlack,
                            }}
                            value={name}
                            onChangeText={(name)=>{this.setState({name})}}
                            inputContainerStyle = {{borderColor: colors.lightBlack}}
                            inputStyle = {{color: colors.lightBlack}}
                        />
                    </View>
                    <View style={textInputStyle}>
                        <Input
                            placeholder='Enter your address'
                            placeholderTextColor={colors.white}
                            leftIcon={{
                                type: 'font-awesome',
                                name: 'address-book',
                                size: 21,
                                color: colors.lightBlack,
                            }}
                            value={address}
                            onChangeText={(address)=>{this.setState({address})}}
                            inputContainerStyle = {{borderColor: colors.lightBlack}}
                            inputStyle = {{color: colors.lightBlack}}
                            keyboardType='email-address'
                        />
                    </View>
                    <View style={textInputStyle}>
                        <Input
                            placeholder='Enter your phone number'
                            placeholderTextColor={colors.white}
                            leftIcon={{
                                type: 'font-awesome',
                                name: 'phone',
                                size: 22,
                                color: colors.lightBlack,
                            }}
                            value={phonenumber}
                            onChangeText={(text)=>this.phoneNumberOnlyNumeric(text)}
                            inputContainerStyle = {{borderColor: colors.lightBlack}}
                            inputStyle = {{color: colors.lightBlack}}
                            keyboardType='numeric'
                            maxLength={10}
                        />
                    </View>                  
                    <TouchableOpacity
                        style={button}
                        onPress={this._changeInfo.bind(this)}
                    >
                        <Text style={buttontext}>CHANGE YOUR INFOMATION</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
function mapStoreToProp(state){
    return {
        user : state.isSignIn,
    }
}

export default connect(mapStoreToProp)(ChangeInfo);

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.headerUI,
        flex: 1,
    },
    header: {
        flex: 7,
        backgroundColor: colors.headerUI,
        flexDirection: 'row',
        padding: width / 25,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    iconStyle: {
        width: width / 13,
        height: height / 18,
    },
    textHeaderStyle: {
        color: colors.bannerUI,
        fontSize: width / 16,
        fontFamily: 'Roboto',
    },
    body: {
        flex: 94,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.paleblue,  
    },
    textInputStyle: {
        width: width - 20,
        height: height * 0.08,
        //paddingLeft: 20,
        margin: 10,
        marginLeft: 50,
        justifyContent: 'center'
    },
    button: {
        width: width / 1.6,
        height: height * 0.08,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.topUI,
        marginTop: 40,
    },
    buttontext: {
        //fontWeight: 'bold',
        color: colors.bannerUI,
    },
})
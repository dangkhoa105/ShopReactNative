import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Alert, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import Register from "../../Redux/API/Register";
import { login } from '../../Redux/Reducer/CreateAction';
import { registry } from '../../Redux/Reducer/CreateAction';
import { Input } from 'react-native-elements';

import colors from '../../Design/Color'

class Registry extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            pass:'',
            repass:'',
            textResult:'',
        }
    }
    gotoSignIn(){
        this.props.login();
    }

    gotoRegistry() {
        this.props.registry();
    }

    _register(){
        const {name,email,pass} =this.state;
        Register(email,name,pass)
        .then(res=> {
            if(res==='KHONG_THANH_CONG') return this._registerSpace();

            else if(res === 'THANH_CONG') return this._registerSuccess();
            
            return this._registerFail();            
        } )
    }

    _registerSpace() {
        Alert.alert(
            'Notice',
            'Please fill out all infomation and correct format',
            [
              {text: 'OK', onPress: () => this.gotoRegistry()},
            ],
            { cancelable: false }
          )
    }

    _registerSuccess(){
        Alert.alert(
            'Notice',
            'Sign up Success',
            [
              {text: 'OK', onPress: () => this.gotoSignIn()},
            ],
            { cancelable: false }
          )
    }
    _registerFail(){
        Alert.alert(
            'Notice',
            'Sign un Fail! (Email was used!!!)',
            [
              {text: 'OK', onPress: () => this.setState({email:''})},
            ],
            { cancelable: false }
          )
    }
    render(){
        const { body, button, buttontext, textInputStyle, inputView } = styles
        return(       
                <View style={body}>
                    <View style={inputView}>
                        <Input
                            placeholder='Enter your name'
                            placeholderTextColor = {colors.bannerUI}
                            leftIcon={{
                                name: 'person',
                                size: 25,
                                color: colors.bannerUI,
                            }}
                            value={this.state.name}
                            onChangeText={(name) => { this.setState({name}) }}
                            inputContainerStyle = {{backgroundColor: 'transparent', borderColor: colors.bannerUI}}
                            containerStyle = {{width: width - 10}}
                            inputStyle = {{color: colors.bannerUI}}

                            returnKeyType = { "next" }
                            onSubmitEditing={() => { this.secondTextInput.focus(); }}
                            blurOnSubmit={false}
                        />
                    </View>   
                    <View style={inputView}>
                        <Input
                            placeholder='Enter your email'
                            placeholderTextColor = {colors.bannerUI}
                            leftIcon={{
                                name: 'email',
                                size: 24,
                                color: colors.bannerUI,
                            }}
                            value={this.state.email}
                            onChangeText={(email) => { this.setState({email}) }}
                            inputContainerStyle = {{backgroundColor: 'transparent', borderColor: colors.bannerUI}}
                            containerStyle = {{width: width - 10}}
                            inputStyle = {{color: colors.bannerUI}}

                            ref={(input) => { this.secondTextInput = input; }}

                            returnKeyType = { "next" }
                            onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                            blurOnSubmit={false}
                        />
                    </View>   
                    <View style={inputView}>
                        <Input
                            placeholder='Enter your password'
                            placeholderTextColor = {colors.bannerUI}
                            leftIcon={{
                                name: 'lock',
                                size: 24,
                                color: colors.bannerUI,
                            }}
                            value={this.state.pass}
                            onChangeText={(pass) => { this.setState({pass}) }}
                            inputContainerStyle = {{backgroundColor: 'transparent', borderColor: colors.bannerUI}}
                            containerStyle = {{width: width - 10}}
                            inputStyle = {{color: colors.bannerUI}}
                            secureTextEntry

                            ref={(input) => { this.thirdTextInput = input; }}

                            returnKeyType = { "next" }
                            onSubmitEditing={() => { this.lastTextInput.focus(); }}
                            blurOnSubmit={false}
                        />
                    </View>   
                    <View style={inputView}>
                        <Input
                            placeholder='Re-enter your password'
                            placeholderTextColor = {colors.bannerUI}
                            leftIcon={{
                                name: 'lock',
                                size: 24,
                                color: colors.bannerUI,
                            }}
                            value={this.state.repass}
                            onChangeText={(repass) => { this.setState({repass}) }}
                            inputContainerStyle = {{backgroundColor: 'transparent', borderColor: colors.bannerUI}}
                            containerStyle = {{width: width - 10}}
                            inputStyle = {{color: colors.bannerUI}}
                            secureTextEntry

                            ref={(input) => { this.lastTextInput = input; }}
                        />
                    </View>   
                    <TouchableOpacity
                        style={button}
                        onPress={() => {this._register() }}
                    >
                        <Text style={buttontext}>SIGN UP NOW</Text>
                    </TouchableOpacity>
                    <Text>{this.state.textResult}</Text>          
                </View>

               
        );
    }
}
export default connect(null,{login, registry})(Registry);

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    body: {
        flex: 10,
        alignItems: 'center',
       //marginTop: 10,
    },
    textInputStyle: {
        
        backgroundColor: '#FFF',
        width: width - 60,
        height: height * 0.07,
        borderRadius: 15,
        marginBottom: 10,
        paddingLeft: 20,
    },
    button: {
        backgroundColor: colors.brightred,
        borderColor: '#FFF',
        width: width / 1.9,
        height: height * 0.07,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    buttontext: {
        color: "#FFF",
        fontWeight: "bold"
    },
    inputView: {
        flex: 1,
        width: width - 80,
        height: height * 0.07,
        borderRadius: 15,
        justifyContent: 'space-around',
        margin: 7,
    },
})
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Alert, TextInput, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Register from "../../Redux/API/Register";
import { login } from '../../Redux/Reducer/CreateAction';
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
            textkq:'',
        }
    }
    gotoSignIn(){
        this.props.login();
    }
    _register(){
        const {name,email,pass} =this.state;
        Register(email,name,pass).then(res=> {
            if(res === 'THANH_CONG') return this._registerSuccess();
            return this._registerFail();
        } )
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
                            placeholderTextColor = 'white'
                            leftIcon={{
                                name: 'person',
                                size: 25,
                                color: 'white',
                            }}
                            value={this.state.name}
                            onChangeText={(name) => { this.setState({name}) }}
                            inputContainerStyle = {{backgroundColor: 'transparent', borderColor: 'white'}}
                            containerStyle = {{width: width - 10}}
                        />
                    </View>   
                    <View style={inputView}>
                        <Input
                            placeholder='Enter your email'
                            placeholderTextColor = 'white'
                            leftIcon={{
                                name: 'email',
                                size: 24,
                                color: 'white',
                            }}
                            value={this.state.email}
                            onChangeText={(email) => { this.setState({email}) }}
                            inputContainerStyle = {{backgroundColor: 'transparent', borderColor: 'white'}}
                            containerStyle = {{width: width - 10}}
                        />
                    </View>   
                    <View style={inputView}>
                        <Input
                            placeholder='Enter your password'
                            placeholderTextColor = 'white'
                            leftIcon={{
                                name: 'lock',
                                size: 24,
                                color: 'white',
                            }}
                            value={this.state.pass}
                            onChangeText={(pass) => { this.setState({pass}) }}
                            inputContainerStyle = {{backgroundColor: 'transparent', borderColor: 'white'}}
                            containerStyle = {{width: width - 10}}
                            secureTextEntry
                        />
                    </View>   
                    <View style={inputView}>
                        <Input
                            placeholder='Re-enter your password'
                            placeholderTextColor = 'white'
                            leftIcon={{
                                name: 'lock',
                                size: 24,
                                color: 'white',
                            }}
                            value={this.state.repass}
                            onChangeText={(repass) => { this.setState({repass}) }}
                            inputContainerStyle = {{backgroundColor: 'transparent', borderColor: 'white'}}
                            containerStyle = {{width: width - 10}}
                            secureTextEntry
                        />
                    </View>   
                    <TouchableOpacity
                        style={button}
                        onPress={() => {this._register() }}
                    >
                        <Text style={buttontext}>SIGN UP NOW</Text>
                    </TouchableOpacity>
                    <Text>{this.state.textkq}</Text>
                </View>

               
        );
    }
}
export default connect(null,{login})(Registry);

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    body: {
        flex: 10,
        alignItems: 'center',
        marginTop: 20,
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
        backgroundColor: colors.darkblue,
        borderColor: '#FFF',
        width: width / 1.5,
        height: height * 0.07,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    buttontext: {
        color: "#FFF",
        fontWeight: "400"
    },
    inputView: {
        width: width - 80,
        height: height * 0.07,
        borderRadius: 15,
        justifyContent: 'space-around',
        margin: 7,
    },
})
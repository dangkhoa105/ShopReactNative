import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Alert, TextInput, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Register from "../../Redux/API/Register";
import { login } from '../../Redux/Reducer/CreateAction';

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
        const { body, button, buttontext, textInputStyle } = styles
        return(       
                <View style={body}>
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={textInputStyle}
                        value={this.state.name}
                        onChangeText={(name) => { this.setState({name}) }}
                        placeholder="Enter your name"
                    />
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={textInputStyle}
                        value={this.state.email}
                        onChangeText={(email) => { this.setState({email}) }}
                        placeholder="Enter your email"
                    />
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={textInputStyle}
                        value={this.state.pass}
                        onChangeText={(pass) => { this.setState({pass}) }}
                        placeholder="Enter your password"
                        secureTextEntry
                    />
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={textInputStyle}
                        value={this.state.repass}
                        onChangeText={(repass) => { this.setState({repass}) }}
                        placeholder="Re-enter your password"
                        secureTextEntry
                    />
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
export default  connect(null,{login})(Registry);

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    body: {
        flex: 7,
        alignItems: 'center',
    },
    textInputStyle: {
        backgroundColor: '#FFF',
        width: width - 60,
        height: height * 0.07,
        borderRadius: 15,
        marginBottom: 10,
        paddingLeft: 30,
    },
    button: {
        borderColor: '#FFF',
        borderWidth: 2,
        width: width - 60,
        height: height * 0.07,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttontext: {
        color: "#FFF",
        fontWeight: "400"
    },
})
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import SignIn from "../../Redux/API/SignIn";
import { OnSignIn } from '../../Redux/Reducer/CreateAction';
import saveToken from '../../Redux/API/saveToken';


class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            pass:'',
        }
    }

    _login(){
        var {email, pass} = this.state;
        SignIn(email, pass)
        .then(res =>  {
            this.props.OnSignIn(res.user);
            this.props.goBackMenu();
            saveToken(res.token);
        })
        .catch(err => console.log(err, "Sign in Fail"));
    }

    render() {
        const { body, button, buttontext, textInputStyle } = styles
        return (

            <View style={body}>
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
                <TouchableOpacity
                    style={button}
                    onPress={() => {this._login()}}
                >
                    <Text style={buttontext}>SIGN IN NOW</Text>
                </TouchableOpacity>
            </View>


        );
    }
}

export default connect(null, {OnSignIn})(Login);

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
        paddingLeft: 30
    },
    button: {
        borderColor: '#FFF',
        borderWidth: 2,
        width: width - 60,
        height: height * 0.07,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4895F0',
        marginTop: 20,
    },
    buttontext: {
        color: '#FFF',
        fontWeight: "400"
    },
})
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import SignIn from "../../Redux/API/SignIn";
import { OnSignIn } from '../../Redux/Reducer/CreateAction';
import saveToken from '../../Redux/API/saveToken';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';


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
        const { body, button, buttontext, textInputStyle, inputView } = styles
        return (

            <View style={body}>
                <View style={inputView}>
                    <Input
                        placeholder='Enter your email'
                        leftIcon={{
                            style: {textInputStyle},
                            name: 'email',
                            size: 24,
                            color: 'gray',
                        }}
                        value= {this.state.email}
                        onChangeText = {(email) => { this.setState({email}) }}
                        inputContainerStyle = {{backgroundColor: 'white', borderColor: 'transparent'}}
                        containerStyle = {{margin: 20}}
                    />
                </View>              
                <View style={inputView}>
                    <Input
                        placeholder='Enter your password'
                        leftIcon={{
                            style: {textInputStyle},
                            name: 'lock',
                            size: 24,
                            color: 'gray',
                        }}
                        value={this.state.pass}
                        onChangeText={(pass) => { this.setState({pass}) }}
                        inputContainerStyle = {{backgroundColor: 'white', borderColor: 'transparent'}}
                        containerStyle = {{margin: 20}}
                        secureTextEntry
                    />
                </View>                
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

const { width, height } = Dimensions.get('window');
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
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4895F0',
        marginTop: 20,
    },
    buttontext: {
        color: '#FFF',
        fontWeight: "400"
    },
    inputView: {
        width: width - 80,
        height: height * 0.07,
        borderRadius: 25,
        justifyContent: 'space-around',
        margin: 10,
        backgroundColor: 'white'
    }
})
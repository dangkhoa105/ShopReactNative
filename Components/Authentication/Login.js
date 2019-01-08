import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import SignIn from "../../Redux/API/SignIn";
import { OnSignIn } from '../../Redux/Reducer/CreateAction';
import saveToken from '../../Redux/API/saveToken';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import colors from '../../Design/Color';


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
            if(res.user === 'SAI_THONG_TIN_DANG_NHAP') return this.loginFail();
            else {
                this.props.OnSignIn(res.user);
                this.props.goBackMenu();
                saveToken(res.token);
            }
        })  
        .catch(err => console.log(err, "Sign in Fail"));
    }

    loginFail(){
        Alert.alert(
            'Notice',
            'Sign in Fail',
            [
              {text: 'OK', onPress: () => this.setState({email: '', pass: ''})},
            ],
            { cancelable: false }
          )
    }

    render() {
        const { body, button, buttontext, textInputStyle, inputView } = styles
        const {email, pass} = this.state;
        return (
            <View style={body}>
                <View style={inputView}>
                    <Input
                        placeholder = 'Enter your email'
                        placeholderTextColor = {colors.bannerUI}
                        leftIcon={{
                            name: 'email',
                            size: 24,
                            color: colors.bannerUI,
                        }}
                        value= {email}
                        onChangeText = {(email) => { this.setState({email}) }}
                        inputContainerStyle = {{backgroundColor: 'transparent', borderColor: colors.bannerUI}}
                        containerStyle = {{width: width - 10}}
                        inputStyle = {{color: colors.bannerUI}}
                    />
                </View>              
                <View style={inputView}>
                    <Input
                        placeholder = 'Enter your password'
                        placeholderTextColor = {colors.bannerUI}
                        leftIcon={{
                            name: 'lock',
                            size: 24,
                            color: colors.bannerUI,
                        }}
                        value={pass}
                        onChangeText={(pass) => { this.setState({pass}) }}
                        inputContainerStyle = {{backgroundColor: 'transparent', borderColor: colors.bannerUI}}
                        containerStyle = {{width: width - 10}}
                        inputStyle = {{color: colors.bannerUI}}
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
        flex: 9,
        alignItems: 'center',
        marginTop: width / 6,
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
        width: width / 1.8,
        height: height * 0.07,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.topUI,
        marginTop: 20,
    },
    buttontext: {
        color: colors.bannerUI,
        fontWeight: "bold"
    },
    inputView: {
        width: width - 80,
        height: height * 0.07,
        borderRadius: 25,
        justifyContent: 'space-around',
        margin: 10,
    }
})
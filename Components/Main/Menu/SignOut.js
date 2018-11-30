import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image , Dimensions} from 'react-native';
import { connect } from 'react-redux';

class SignOut extends Component {
  
  render() {
    const {button, textSignIn} = styles;
    return (
        <View>
        <TouchableOpacity
          style={button}
          onPress={()=> {this.props.goSignIn()}}
        >
          <Text style={textSignIn}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
function mapStoreToProp(state){
  return {
    user : state.isSignIn,
  }
}
export default  connect(mapStoreToProp)(SignOut);
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFF',
    width: (width / 1.5) - 20,
    height: 50,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    borderRadius: 10,
    paddingLeft: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  textSignIn: {
    textAlign: 'center',
    color: '#4895F0',
    fontSize: 15
  },
})
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import colors from '../../../Design/Color';

class SignOut extends Component {
  
  render() {
    const { button, textSignIn } = styles;
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
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFF',
    width: (width / 1.5) - 40,
    height: width / 8.8,
    margin: width / 5,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSignIn: {
    textAlign: 'center',
    color: colors.brightred,
    fontSize: 19
  },
})
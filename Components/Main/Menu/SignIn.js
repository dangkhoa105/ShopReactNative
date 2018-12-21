import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import { OnSignOut } from '../../../Redux/Reducer/CreateAction';
import saveToken from '../../../Redux/API/saveToken';


class SignIn extends Component {
  _OnSignOut(){
    
    this.props.OnSignOut();
    saveToken('');

  }
  render() {
    const { user } = this.props;
    const { button, buttonText, profileBody, textStyle } = styles;
    return (
        <View style={{flex: 1, alignItems: 'center' }}>
          <Text style={textStyle}>{ user != null ? user.name : 'Error'}</Text>
          <View style={profileBody}>
            <TouchableOpacity
              style={button}
              onPress={()=> {this.props.goOrderHis()}}
            >
              <Text style={buttonText}>Order History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={button}
              onPress={()=> {this.props.goChange()}}
            >
              <Text style={buttonText}>Change Info</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={button}
              onPress={this._OnSignOut.bind(this) }
            >
              <Text style={buttonText}>Sign Out</Text>
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
export default  connect(mapStoreToProp,{OnSignOut})(SignIn);
const { width, height } = Dimensions.get('window');
const imageWidth = width * 0.2;
const imageHeight = (imageWidth / 2000) * 2000;
const styles = StyleSheet.create({
  textStyle: {
    color: '#FFF',
    fontSize: 15,
    textAlign: 'center',
    paddingBottom: 10, 
  },
  profileBody: {
    //flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.5,
  },
  button: {
    backgroundColor: '#FFF',
    width: (width / 1.5) - 20,
    height: 50,
    margin: 5,
    borderRadius: 10,
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#4895F0',
    fontSize: 15
  },
})
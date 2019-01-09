import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import { OnSignOut } from '../../../Redux/Reducer/CreateAction';
import saveToken from '../../../Redux/API/saveToken';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Octicons';
import colors from '../../../Design/Color';

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
            <Button
              icon={
                <Icon
                  name='history'
                  size={30}
                  color={colors.bannerUI}
                  style={{margin: 10}}
                />
              }
              buttonStyle = {button}
              containerStyle = {{backgroundColor: colors.headerUI, margin: 10}}
              titleStyle = {{ fontSize: 20, color: colors.bannerUI }}
              onPress={()=> {this.props.goOrderHis()}}
              title = 'Order History              >'
            />

            <Button
              icon={
                <Icon
                  name='info'
                  size={30}
                  color={colors.bannerUI}
                  style={{margin: 11}}
                />
              }
              buttonStyle = {button}
              containerStyle = {{backgroundColor: colors.headerUI, margin: 10}}
              titleStyle = {{ fontSize: 20, color: colors.bannerUI }}
              onPress={()=> {this.props.goChange()}}
              title = 'Change Infomation                >'
            />

            <Button
              icon={
                <Icon
                  name='person'
                  size={30}
                  color={colors.bannerUI}
                  style={{margin: 12}}
                />
              }
              buttonStyle = {button}
              containerStyle = {{backgroundColor: colors.headerUI, margin: 10}}
              titleStyle = {{ fontSize: 20, color: colors.bannerUI }}
              onPress={() => {this.props.goCont()}}
              title = 'About                           >'
            />

            <Button
              icon={
                <Icon
                  name='sign-out'
                  size={30}
                  color={colors.bannerUI}
                  style={{margin: 10}}
                />
              }
              buttonStyle = {button}
              containerStyle = {{backgroundColor: colors.headerUI, margin: 10}}
              titleStyle = {{ fontSize: 20, color: colors.bannerUI }}
              onPress={this._OnSignOut.bind(this)}
              title = 'Sign Out                       >'
            />
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
    color: colors.bannerUI,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    //paddingBottom: 30, 
  },
  profileBody: {
    margin: 20,
    height: height * 0.5,
  },
  button: {
    backgroundColor: colors.headerUI,
    width: width / 1.4,
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 2,
    borderColor: colors.headerUI,
    borderBottomColor: colors.bannerUI
  },
})
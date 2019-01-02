import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import {connect} from 'react-redux';
import SignIn from './Menu/SignIn';
import SignOut from './Menu/SignOut';

import avata from '../../Image/temp/profile.png';
import colors from '../../Design/Color';

class Menu extends Component {

  goOrderHistory(){
    this.props.navigation.navigate('FormOrderHistory');
  } 
  goChangeInfo(){
    this.props.navigation.navigate('FormChangeInfo');
  }
  goSignIn(){
    this.props.navigation.navigate('FormAuthen');
  }

  render() {
    const { container, imageStyle } = styles;
    const loginJSX=(
      <SignIn goOrderHis = {this.goOrderHistory.bind(this)} goChange = {this.goChangeInfo.bind(this)}/>
    );
    const logoutJSX = (
      <SignOut goSignIn = {this.goSignIn.bind(this)}/>
    );
    //Khúc này viết sau nếu không chạy sai
    const {user} = this.props;
    const main = user !== '' ? loginJSX : logoutJSX;
    return (
      <View style={container}>
        <Image source={avata} style={imageStyle} />
       
        {main}
      </View>
    );
  }
}
function mapStoreToProp(state){
  return {
    user : state.isSignIn,
  }
}
export default  connect(mapStoreToProp)(Menu);
const { width } = Dimensions.get('window');
const imageWidth = width * 0.2;
const imageHeight = (imageWidth / 2000) * 2000;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkblue_1,
    alignItems: 'center',
  },
  imageStyle: {
    width: imageWidth * 1.7,
    height: imageHeight * 1.7,
    borderRadius: 100,
    marginTop: 50,
    marginBottom: 15,
  },
})
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image , Dimensions} from 'react-native';
import {connect} from 'react-redux';
import SignIn from './Menu/SignIn';
import SignOut from './Menu/SignOut';

import avata from '../../Image/temp/profile.png';

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
    const {container,button, buttonText, imageStyle, profileBody, profileTop, textStyle, textSignIn} = styles;
    //Khúc này viết trước
    // console.log (user, "name") 
    const loginJSX=(
      <SignIn goOrderHis = {this.goOrderHistory.bind(this)} goChange = {this.goChangeInfo.bind(this)}/>
      // <View >
      //     <Text style={textStyle}>{ user != null ? user.name : 'lỗi'}</Text>
      //     <View style={profileBody}>
      //       <TouchableOpacity
      //         style={button}
      //         onPress={this.goOrderHistory.bind(this)}
      //       >
      //         <Text style={buttonText}>Order History</Text>
      //       </TouchableOpacity>
      //       <TouchableOpacity
      //         style={button}
      //         onPress={this.goChangeInfo.bind(this)}
      //       >
      //         <Text style={buttonText}>Change Info</Text>
      //       </TouchableOpacity>
      //       <TouchableOpacity
      //         style={button}
      //         onPress={() => { }}
      //       >
      //         <Text style={buttonText}>Sign Out</Text>
      //       </TouchableOpacity>
      //     </View>
      //   </View>
    );
    const logoutJSX = (
      <SignOut goSignIn = {this.goSignIn.bind(this)}/>
      // <View>
      //   <TouchableOpacity
      //     style={button}
      //     onPress={this.goSignIn.bind(this)}
      //   >
      //     <Text style={textSignIn}>SIGN IN</Text>
      //   </TouchableOpacity>
      // </View>
    );
    //Khúc này viết sau nếu không chạy sai
    const {user} = this.props;
    //  console.log(user,"FORM");
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
const {width, height} = Dimensions.get('window');
const imageWidth = width*0.2;
const imageHeight = (imageWidth /2000)*2000;
const styles = StyleSheet.create({
  container: {
    //width:width/1.5,
    flex:1,
    backgroundColor: '#4895F0',
    //  justifyContent: 'center',
      alignItems: 'center',
  },
    imageStyle:{
      width:imageWidth * 1.7,
      height:imageHeight * 1.7,
      borderRadius:100,
      margin:20,
    },
    textStyle:{
      color:'white',
      textAlign:'center',
    },
  profileBody:{
    alignItems:'center',
    justifyContent:'center',
    height:height*0.72,
  },
    button:{
      backgroundColor:'white',
      width:(width/1.5)-20,
      height:40,
      margin:5,
      justifyContent:'center',
      borderRadius:10,
      paddingLeft:10,
    },
      buttonText:{
        color:'#28b08a',
      },
      textSignIn:{
        textAlign:'center',
        color:'#28b08a',
      },
})
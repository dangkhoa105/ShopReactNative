import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { connect } from 'react-redux';

import Swiper from 'react-native-swiper';
import ElevatedView from 'react-native-elevated-view'

class Sideproduct extends Component {
  render() {
    const {arrType} = this.props;
    const { banner, bannerText, text, bannerImage, image, titleText, stayElavated } = styles
    return (
      <View margin={10}>
        <ElevatedView elevation={5} style={stayElavated}>
          <View style={banner}>
            <View style={bannerText}>
              <Text style ={text}>LIST OF CATEGORY</Text>
            </View>
            <View style = {bannerImage}>
              <Swiper>
                {arrType.map((e) => ( //hàm map có ý nghĩa là từ 1 cái mảng về 1 cái mảng khác (biến mảng từ đối tượng types sang mảng của View)
                  //có 4 phần tử thì sẽ render về 4 cái 
                  <View key={e.id}>
                    <TouchableOpacity ref={'Midi'} onPress={()=>this.props.goProduct(e)} key={e.id} >{/* dùng để gán tên cho TouchableOpacity */}
                      <ImageBackground
                        style={image}
                        source={{ uri: `http://192.168.56.1:80/app/images/type/${e.image}` }}
                      >
                        <Text style={titleText}>{e.name}</Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                ))}
              </Swiper>
            </View>
          </View>
        </ElevatedView>    
      </View>     
    );
  }
}

function mapStoreToMap(state) {
  return{
    arrType: state.arrType,
  }
}

export default connect(mapStoreToMap)(Sideproduct);
var {width, height} = Dimensions.get('window');
const imageWidth= width - 40;
const imageHeight= (imageWidth / 933) * 456;
const styles = StyleSheet.create({
    banner: {
      height: height * 0.36,
      backgroundColor: '#fff',
      margin: width / 38,
      marginTop: 0,
    },
    bannerText: {
      flex: 1,
      justifyContent: 'center',
      marginLeft: 10,
    },
    text: {
      color: '#AFAEAF',
      fontSize: 18,
    },
    bannerImage: {
      flex: 4,
      margin: 10,
      marginTop: 0,
    },
    titleText: {
      fontSize: 15,
      color: '#9A9A9A',
    },
    image: {
      width: imageWidth,
      height: imageHeight,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 0,
    },
    stayElavated: {
      backgroundColor: '#FFF',
    },
})
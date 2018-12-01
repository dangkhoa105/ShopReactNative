import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';

import ElevatedView from 'react-native-elevated-view'

import banner from '../../../../Image/temp/banner.jpg'

export default class Banner extends Component {
  render() {
    const type = {name: 'SPRING COLLECTION', id: 'COLLECTION'};
    const { stayElavated, sbanner, bannerText, bannerImage, text, image } = styles
    return (
      <View margin={7}>
        <ElevatedView elevation={3} style={stayElavated}>
          <View style={sbanner}>
              <TouchableOpacity style={sbanner} onPress={()=>this.props.goCollection(type)}>
                <View style={bannerText}>
                  <Text style={text}>POPULAR PRODUCT</Text>
                </View>
                <View style={bannerImage}>
                  <Image
                    style={image}
                    source={banner}
                  />
                </View>
              </TouchableOpacity>
            </View>
        </ElevatedView>      
      </View>      
    );
  }
}

var { width, height } = Dimensions.get('window');
const imageWidth = width - 40;
const imageHeight = (imageWidth / 933) * 456;
const styles = StyleSheet.create({
  sbanner: {
    height: height * 0.37,
    backgroundColor: '#fff',
    margin: width / 38,
    justifyContent: 'space-around',
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
  image: {
    width: imageWidth,
    height: imageHeight,
    paddingBottom: 0,
  },
  stayElavated: {
    backgroundColor: '#FFF',
  },
})
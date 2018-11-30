import React, { Component } from 'react';
import {  StyleSheet,  Text,  View, TouchableOpacity, Dimensions, Image} from 'react-native';

import banner from '../../../../Image/temp/banner.jpg'

export default class Banner extends Component {
  render() {
    const type = {name: 'SPRING COLLECTION', id: 'COLLECTION'};
    return (
      <View style={styles.banner}>
        <TouchableOpacity style={styles.banner} onPress={()=>this.props.goCollection(type)}>
          <View style={styles.bannerText}>
            <Text style={styles.text}>POPULAR PRODUCT</Text>
          </View>
          <View style={styles.bannerImage}>
            <Image
              style={styles.image}
              source={banner}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

var {width, height} = Dimensions.get('window');
const imageWidth = width - 40;
const imageHeight = (imageWidth / 933) * 456;
const styles = StyleSheet.create({
    banner: {
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
    }
})
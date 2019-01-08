  import React, { Component } from 'react';
  import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';

  import ElevatedView from 'react-native-elevated-view'

  import banner from '../../../../Image/temp/banner.jpg'
  import colors from '../../../../Design/Color';

  export default class Banner extends Component {
    render() {
      const type = {name: 'SPRING COLLECTION', id: 'COLLECTION'};
      const { stayElavated, sbanner, bannerText, bannerImage, text, image } = styles
      return (
        <View margin={10} marginTop={20} >
          <ElevatedView elevation={5} style={stayElavated}>
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
  const imageHeight = (imageWidth / 933) * 475;
  const styles = StyleSheet.create({
    sbanner: {
      height: height * 0.35,
      backgroundColor: '#E2E2E2',
      justifyContent: 'space-around',
    },
    bannerText: {
      flex: 0.4,
      justifyContent: 'center',
      margin: 10,
    },
    text: {
      color: colors.darkgrayishblue,
      fontSize: 18,
    },
    bannerImage: {
      flex: 4,
      marginTop: 0,
      margin: 10,
    },
    image: {
      width: imageWidth,
      height: imageHeight,
      paddingBottom: 0,
    },
    stayElavated: {
      backgroundColor: colors.bannerUIS,
    },
  })
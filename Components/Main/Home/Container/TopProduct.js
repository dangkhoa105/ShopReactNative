import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, FlatList} from 'react-native';
import { connect } from 'react-redux';

import ElevatedView from 'react-native-elevated-view'

const url="http://192.168.56.1:80/app/images/product/";

class TopProduct extends Component {
  render() {
    const { banner, bannerText, text, product, productImage, productText, productTextOne, productTextTwo, stayElevated, content } = styles;
    const { arrTopProducts }= this.props;
    return (
      <View margin={10}>
        <ElevatedView elevation={5} style={stayElevated}>
          <View style={banner}>           
              <View style={bannerText}>
                <Text style={text}>TOP PRODUCT</Text>
              </View>
              <View style={content}>
                <FlatList
                    data={arrTopProducts}
                    renderItem={({ item }) =>
                      <View style={product}>
                        <ElevatedView elevation={5} style={stayElevated}>
                          <TouchableOpacity onPress={()=>this.props.goProductDetails(item)}>                        
                            <View >
                              <Image source={{uri:`${url}${item.images[0]}`}} style={productImage} />
                            </View>
                            <View style={productText}>
                              <Text style={productTextOne}>{item.name.toUpperCase()}</Text>
                              <Text style={productTextTwo}>{`${item.price}$`}</Text>
                            </View>                        
                          </TouchableOpacity>
                        </ElevatedView>
                      </View>}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                  />       
              </View>           
          </View>
        </ElevatedView>
      </View>
      
    );
  }
}
function mapStoreToProps(state){
  return{
    arrTopProducts: state.arrTopProducts,
  }
}

export default connect(mapStoreToProps)(TopProduct);

var {width} = Dimensions.get('window');
const imageWidth= (width-70)/2;
const imageHeight= (imageWidth /361) *455;
const styles = StyleSheet.create({
    banner: {
      backgroundColor: '#FFF',
      //margin: width / 38,
      padding: 6,
    },
    bannerText: {
      height: 50,
      justifyContent: 'center',
      //margin: 10,
      paddingLeft: 10,
    },
    text: {
      color: '#AFAEAF',
      fontSize: 18,
    },
    content: {
      margin: 5,
      marginTop: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      paddingBottom: 10,
    },
    product: {
      marginLeft: 9,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingBottom: 10,
      flexWrap: 'wrap'
    },
    productImage: {
      width: imageWidth,
      height: imageHeight,
      //marginTop: 3,
    },
    productText: {
      marginTop: 15,
      marginBottom: 15,
    },
    productTextOne: {
      paddingLeft: 10,
      color: '#D3D3CF',
      fontWeight: '500',
    },
    productTextTwo: {
      paddingLeft: 10,
      color: '#662F90',
      fontSize: 13,
      fontWeight: '500',
    },
    stayElevated: {
      backgroundColor: '#FFF',
    }
})
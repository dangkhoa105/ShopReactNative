import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, FlatList, TextInput } from 'react-native';
import { connect } from 'react-redux';
import search from '../../Redux/API/search';
import { searchProduct } from '../../Redux/Reducer/CreateAction';

import ElevatedView from 'react-native-elevated-view'
import { Header } from 'native-base';

import back from '../../Image/back_white.png';

const url="http://192.168.56.1:80/app/images/product/";

class Search extends Component{
  constructor(props){
    super(props);
    this.state={
        contentSearch:'',
    }
  }
  goDetail(product){
    this.props.navigation.navigate('PRODUCTDETAIL',{product});
  }
  _search(){
    const {contentSearch} = this.state;
    search(contentSearch)
    .then(arrproduct => 
      this.props.searchProduct(arrproduct)
    )
    .catch(err => this._searchFail())
  }
  _searchFail(){
    Alert.alert(
      'Search',
      'Product not found',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
    )
  }
  goBack(){
    this.props.navigation.navigate('First');
    //this.props.navigation.navigate('DrawerOpen')
  }
  render() {
    const { colorStyle, header, hearderSearch, textinput,iconStyle, stylesearch, products, stayElavated, productsImage, imageProduct, productsContent, textStyle0, textStyle1, textStyle2, productsShowDetail } = styles;
    const { arrproduct } = this.props;
    console.log(arrproduct, "arrproduct");
    return (
      <View style={stylesearch}>
        <View style={header}>
          <TouchableOpacity onPress={this.goBack.bind(this)}>
            <Image style={iconStyle} source={back} />
          </TouchableOpacity>
          <View style={hearderSearch}>                                                                     
            <TextInput
              underlineColorAndroid='transparent'
              style={textinput}
              placeholder="What do you want to buy ?"
              onChangeText={(contentSearch)=>{this.setState({contentSearch})}}
              onSubmitEditing={this._search.bind(this)}  
              value={this.state.contentSearch}                                                                                       
            /> 
          </View>
        </View>
        <FlatList
          data={arrproduct}
          renderItem={({ item }) =>
            <View margin={10}>
              <ElevatedView elevation={6} style={stayElavated}>
              <View style={products}>
                <View style={productsImage}>
                  <Image style={imageProduct} source={{uri:`${url}${item.images[0]}`}} />
                </View>
                <View style={productsContent}>
                  <Text style={textStyle0}> {item.name.toUpperCase()}</Text>
                  <Text style={textStyle1}> {item.price}$</Text>
                  <Text> {item.material}</Text>
                  <View style={colorStyle}>
                    <Text> Color {item.color}</Text>
                    <View style={{width:12, height:12, backgroundColor: item.color.toLowerCase(), borderRadius: 100, marginLeft: 15}}/>
                  </View>
                </View>
                <View style={productsShowDetail}>
                  <TouchableOpacity
                    onPress={()=> {this.goDetail(item)}}
                  >
                    <Text style={textStyle2}>SHOW DETAIL</Text>
                  </TouchableOpacity>
                </View>
              </View>
              </ElevatedView>
            </View>
          }
          keyExtractor={(item)=> item.id.toString()}
        />

      </View>
    );
  }
}
function mapStoreToProps(state){
  return{
    arrproduct: state.arrproduct
  }
}

export default connect(mapStoreToProps,{searchProduct})(Search);
var { width, height } = Dimensions.get('window');
const imageWidth = (width - 100) / 3;
const imageHeight = (imageWidth / 361) * 452;
const styles=StyleSheet.create({
  stylesearch: {
    flex: 13,
  },
  products: {
    flexDirection: 'row',
    margin: width / 38,
    backgroundColor: 'white',
    justifyContent: 'space-around'
  },
  productsImage: {
    margin: 10,
  },
  imageProduct: {
    width: imageWidth,
    height: imageHeight,
  },
  productsContent: {
    margin: 10,
    justifyContent: 'space-between',
  },
  textStyle0: {
    color: 'gray',
    fontSize: 15,
  },
  textStyle1: {
    color: '#c6386b',
  },
  productsShowDetail: {
    margin: 10,
    justifyContent: 'flex-end',
  },
  textStyle2: {
    color: '#c6386b',
    fontSize: 13,
    alignItems: 'flex-start'
  },
  colorStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stayElavated: {
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#4895F0',
    justifyContent: 'space-around',
    padding: width / 25,
    paddingTop: width / 30,
    height: height / 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hearderSearch: {
    backgroundColor: 'white',
    marginTop: width / 70,
    //justifyContent: 'space-around',
  },
  textinput: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: height / 20,
    width: width / 1.4,
    paddingLeft: 10,
    paddingVertical: 1 
  },
  iconStyle: {
    marginTop: width / 80,
    width: width / 13,
    height: height / 16,
  },
})
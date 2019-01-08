import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, FlatList, TextInput, Alert } from 'react-native';
import { connect } from 'react-redux';
import search from '../../Redux/API/search';
import { searchProduct } from '../../Redux/Reducer/CreateAction';
import { SearchBar, Icon } from 'react-native-elements'

import ElevatedView from 'react-native-elevated-view'
import { Header } from 'native-base';

import back from '../../Image/back_white.png';
import colors from '../../Design/Color';

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
    .then(arrProduct => {
      this.props.searchProduct(arrProduct)
      if(arrProduct==='KHONG_TIM_THAY') return this._searchFail();
    })
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
          <Icon
            name='keyboard-arrow-left'
            type='MaterialIcons'
            color='#ffffff'
            size={60}
            onPress={this.goBack.bind(this)} 
          />         
          <View style={hearderSearch}>                                                                     
            <SearchBar
              lightTheme
              platform="android"
              underlineColorAndroid='transparent'
              placeholder="Search..."                        
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
              <ElevatedView elevation={5} style={stayElavated}>
              <View style={products}>
                <View style={productsImage}>
                  <Image style={imageProduct} source={{uri:`${url}${item.images[0]}`}} />
                </View>
                <View style={productsContent}>
                  <Text style={textStyle0}> {item.name.toUpperCase()}</Text>
                  <Text style={textStyle1}> {item.price}$</Text>
                  <Text style={{color: colors.grayishorange, fontSize: 14, fontWeight: '100'}}> {item.material}</Text>
                  <View style={colorStyle}>
                    <Text style={{color: colors.vividred}}> Color {item.color}</Text>
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
    justifyContent: 'space-between'
  },
  productsImage: {
    margin: 5,
  },
  imageProduct: {
    width: imageWidth,
    height: imageHeight,
  },
  productsContent: {
    flex: 60,
    justifyContent: 'space-between',
  },
  textStyle0: {
    
    color: colors.lightBlack,
    fontSize: 17,
    fontWeight: '300',
  },
  textStyle1: {
    color: colors.brightorange,
    fontSize: 14,
    fontWeight: '100'
  },
  productsShowDetail: {
    margin: 5,
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
    backgroundColor: colors.headerUI,
    padding: width / 25,
    paddingTop: width / 24,
    height: height / 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hearderSearch: {
    backgroundColor: 'white',
    marginLeft: width / 25,
    justifyContent: 'space-around',
    height: height / 20,
    width: width / 1.5,
    borderRadius: 20,
  },
  textinput: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: height / 20,
    width: width / 1.4,
    paddingLeft: 7,
    paddingVertical: 1 
  },
  iconStyle: {
    paddingTop: height / 80,
  },
})
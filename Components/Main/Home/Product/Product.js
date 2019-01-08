import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import getListProduct from '../../../../Redux/API/getListProduct';
import { fetchListProduct, getListProductsThunk, refreshListProduct, loadpage, setRefre } from '../../../../Redux/Reducer/CreateAction';

import ElevatedView from 'react-native-elevated-view'

import back from '../../../../Image/back_white.png';
import colors from '../../../../Design/Color';


const url="http://192.168.56.1:80/app/images/product/";

class Product extends Component {
  constructor(props){
    super(props);
    this.state={
      page: 1,
      refre: false,
    }
  }
  goDetail(product){
    this.props.navigation.navigate('PRODUCTDETAIL',{product});
  }
  goHome(){
    this.props.navigation.pop();
    this.props.refreshListProduct();
  }
  componentDidMount(){
    var {type} = this.props.navigation.state.params;
    var {page} = this.state;
    console.log(page,"page");
    this.props.getListProductsThunk(type.id,page)//dùng redux thunk
  }
  _refre() {
    var { type } = this.props.navigation.state.params;
    var { page } = this.state;
    var { refre } = this.props;
    this.setState({refre:true});
    getListProduct(type.id, page + 1)
      .then(listProduct => {
        if (listProduct.length != 0) {
          this.props.fetchListProduct(listProduct);
          this.setState({page: page+1, refre: false});
          this.props.setRefre();
        }
      })
      .catch(err => {console.log(err, "LOI"); this.setState({refre:false})})
  }

  render() {
    const { textName, wrapper, textPrice, textMaterial, textShowDetail, colorStyle, container, stayElavated, header, body, imagebackstyle, textheaderstyle, products, imageProduct, productsImage, productsContent, productsShowDetail } = styles;
    const { type } = this.props.navigation.state.params;
    const { listProducts } = this.props;
    console.log(listProducts,"listproducts");
    const { refre } = this.state;
    return (
      <View style={container}>
        <View style={wrapper}>
          <View style={header}>
            <TouchableOpacity onPress={this.goHome.bind(this)}>
              <Image style={imagebackstyle} source={back} />
            </TouchableOpacity>
            <Text key={type.id} style={textheaderstyle}>{type.name}</Text>
            <View style={{ width: 30 }} />
          </View>
          <FlatList
            refreshing={refre}
            onRefresh={()=>{this._refre()}}
            data={listProducts}
            renderItem={({ item }) => 
              <View margin={10}>
                <ElevatedView elevation={5} style={stayElavated}>
                  <View style={products} >
                    <Image style={imageProduct} source={{uri:`${url}${item.images[0]}`}} />
                    <View style={productsContent}>
                      <Text style={textName}>{item.name.toUpperCase()} </Text>
                      <Text style={textPrice}> {item.price}$</Text>
                      <Text style={textMaterial}> {item.material} </Text>  
                      <View style={colorStyle}>
                        <Text style={{color: colors.darkblue}}> Color {item.color}</Text>
                        <View style={{width:16, height:16, backgroundColor: item.color.toLowerCase(), borderRadius:8}}/>
                      </View>                         
                    </View>
                    <View style={productsShowDetail}>                            
                      <TouchableOpacity onPress={()=> {this.goDetail(item)}}>
                        <Text style={textShowDetail}>SHOW DETAIL</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ElevatedView>      
              </View> 
            }    
            keyExtractor={(item)=> item.id.toString()}              
          />
        </View>
      </View>
    );
  }
}//361*452

function mapStoreToProps(state){
  return {
    listProducts : state.listProducts,
    page: state.page,
  }
}

export default connect(mapStoreToProps,{fetchListProduct, getListProductsThunk, refreshListProduct, loadpage, setRefre})(Product);
var { width, height } = Dimensions.get('window');
const imageWidth = (width - 70) / 3;
const imageHeight = (imageWidth / 361) * 452;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bannerUI,
    height: height + 15,
  },
  wrapper: {
    backgroundColor: colors.bannerUI,
    //margin: 10,
  },
  header: {
    backgroundColor: colors.slideUI,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  imagebackstyle: {
    width: width / 13,
    height: height / 18,
  },
  textheaderstyle: {
    fontFamily: 'Avenir',
    fontSize: width / 22,
    color: colors.paleblue,
  },
  body: {
    flex: 14,
    margin: 10,
    
  },
  products: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  productsImage: {
    height: width / 2.9,
    width: (90 * 452) / 361
  },
  imageProduct: {
    marginLeft: 10,
    width: 90,
    height: (90 * 452) / 361,
    resizeMode: 'center'
  },
  productsContent: {
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    flex: 1
  },
  textName: {
    fontFamily: 'Avenir',
    color: colors.lightBlack,
    fontSize: 20,
    fontWeight: '400',
  },
  textPrice: {
    fontFamily: 'Avenir',
    color: colors.brightorange,
  },
  textMaterial: {
    fontFamily: 'Avenir',
    color: colors.grayishorange,
  },
  textShowDetail: {
    fontFamily: 'Avenir',
    color: '#B10D65',
    fontSize: 15,
  },
  productsShowDetail: {
    width: width / 4,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  colorStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  color: {
    width: 16,
    height: 16,
    backgroundColor: 'blue',
    borderRadius: 8,
  },
  stayElavated: {
    backgroundColor: '#FFF',
  },
})
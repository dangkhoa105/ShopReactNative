import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import getListProduct from '../../../../Redux/API/getListProduct';
import { fetchListProduct, getListProductsThunk, refreshListProduct, loadpage, setRefre } from '../../../../Redux/Reducer/CreateAction';


import back from '../../../../Image/backList.png';


const url="http://192.168.56.1:80/app/images/product/";

class Product extends Component {
  constructor(props){
    super(props);
    this.state={
      page:1,
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
    const { textName, textPrice, textMaterial, textShowDetail, colorStyle, container, wrapper, header, body, imagebackstyle, textheaderstyle, products, imageProduct, productsImage, productsContent, productsShowDetail } = styles;
    const { type } = this.props.navigation.state.params;
    const { listProducts } = this.props;
    console.log(listProducts,"listproducts");
    const { refre } = this.state;
    return (
      <View style={container}>
        <ScrollView style={wrapper}>
          <View style={header}>
            <TouchableOpacity onPress={this.goHome.bind(this)}>
              <Image style={imagebackstyle} source={back} />
            </TouchableOpacity>
            <Text key={type.id} style={textheaderstyle}>{type.name}</Text>
            <Text></Text>
          </View>
          <View style={body}>
            <FlatList
              refreshing={refre}
              onRefresh={()=>{this._refre()}}

              data={listProducts}
              renderItem={({ item }) => 
                <View style={products} >
                  <View style={productsImage}>
                    <Image style={imageProduct} source={{uri:`${url}${item.images[0]}`}} />
                  </View>
                  <View style={productsContent}>
                    <Text style={textName}>{item.name.toUpperCase()} </Text>
                    <Text style={textPrice}> {item.price}$</Text>
                    <Text style={textMaterial}> {item.material} </Text>
                    <View style={colorStyle}>
                      <Text> Color {item.color}</Text>
                      <View style={{width:16, height:16, backgroundColor: item.color.toLowerCase(), borderRadius:8}}></View>
                    </View>
                  </View>
                  <View style={productsShowDetail}>
                    <TouchableOpacity
                      onPress={()=> {this.goDetail(item)}}
                    >
                      <Text style={textShowDetail}>SHOW DETAIL</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              }    
              keyExtractor={(item)=> item.id.toString()}              
            />
          </View>
        </ScrollView>        
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
    flex: 1,
    backgroundColor: '#DBDBDB',
    margin: width / 38,
    borderColor: 'gray',
    borderWidth: 1,
  },
  wrapper: {
    backgroundColor: "#FFF",
    margin: 4
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  imagebackstyle: {
    width: width / 13,
    height: height / 18,
  },
  textheaderstyle: {
    fontSize: width / 23,
    color: '#B10D65',
  },
  body: {
    flex: 14,
    padding: 10,
  },
  products: {
    flexDirection: 'row',
    paddingVertical: 15,
    padding: 10,
    borderTopColor: '#F0F0F0',
    borderBottomColor: '#FFF',
    borderLeftColor: '#FFF',
    borderRightColor: '#FFF',
    borderWidth: 2,
  },
  productsImage: {
    padding: 5,
    height: 150,
    width: (90 * 452) / 361
  },
  imageProduct: {
    width: imageWidth,
    height: imageHeight,
  },
  productsContent: {
    flex: 100,
    justifyContent: 'space-between',
    marginLeft: 15,
    padding: 5
    //flex: 1,
  },
  textName: {
    color: '#BCBCBC',
    fontSize: 17,
    fontWeight: '300',
  },
  textPrice: {
    color: '#B10D65',
    fontSize: 14,
    fontWeight: '100'
  },
  textMaterial: {
    fontSize: 14,
    fontWeight: '100',
  },
  textShowDetail: {
    color: '#B10D65',
    fontSize: 12,
  },
  productsShowDetail: {
    flex: 30,
    //borderRadius: 8,
    paddingLeft: 14,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: imageWidth,
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
  }
})
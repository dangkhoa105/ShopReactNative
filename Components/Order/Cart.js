import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';
import { updateProductsCart } from '../../Redux/Reducer/CreateAction.js';
import saveCart from "../../Redux/API/saveCart.js";
import getToken from '../../Redux/API/getToken';
import sendOrder from '../../Redux/API/sendOrder';

import ElevatedView from 'react-native-elevated-view'
import colors from '../../Design/Color.js';

import back from '../../Image/back_white.png';

const url = "http://192.168.56.1:80/app/images/product/";

class Cart extends Component {
  goDetail(product) {
    this.props.navigation.navigate('PRODUCTDETAIL', { product });
  }
  deleteProduct(productID) {
    const { arrCart } = this.props;
    const newarrCart = arrCart.filter(e => e.id !== productID);
    console.log(newarrCart, "mang moi");
    this.props.updateProductsCart(newarrCart);
    saveCart(newarrCart);
  }//Xóa sản phẩm
  incrQuantity(productID) {
    const { arrCart } = this.props;
    var newarrCart = arrCart.map(e => {
      if (e.id == productID) {
        e.quantity += 1;
      }
      return e;
    });
    console.log(newarrCart, "mang moi");
    this.props.updateProductsCart(newarrCart);
    saveCart(newarrCart);
  }//thâm số lượng sản phẩm
  decrQuantity(productID) {
    const { arrCart } = this.props;
    var newarrCart = arrCart.map(e => {
      if (e.id == productID) {
        if (e.quantity > 1) {
          e.quantity -= 1;
        }
        else {
          Alert.alert(
            'Xóa ',
            'Do you want to delete this product ?',
            [
              { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              { text: 'OK', onPress: () => this.deleteProduct(productID) },
            ],
          )
        }
      }
      return e;
    });
    this.props.updateProductsCart(newarrCart);
    saveCart(newarrCart);
  }// Xóa số lượng của sản phẩm
  async _senOrder() {
    try {
      var token = await getToken();
      var arrayDetail = this.props.arrCart.map(e => ({ id: e.id, quantity: e.quantity }));
      const kq = await sendOrder(token, arrayDetail);
      if (kq === "THEM_THANH_CONG") return this._Success();
      return console.log("LOI");
    } catch (error) {
      console.log(error, "LOI");
    }
  }
  _Success() {
    Alert.alert(
      'Information Order',
      '',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.log(
          this.props.updateProductsCart([]),
          saveCart([])

        )},
      ],
      { cancelable: false }
    )
  }
  goBack(){
    this.props.navigation.navigate('First');
  }
  render() {
    const { stylecart, product, header, iconStyle, stayElavated, viewImage, viewTitle, viewShow, textstyleadd, imageStyle, tatolCart, textTatol, textStyleName, textStyleShow, textStylePrice, add } = styles;
    const { arrCart, user } = this.props;
    const arrTotal = arrCart.map(e => e.price * e.quantity);
    const total = arrTotal.length ? arrTotal.reduce((a, b) => a + b) : 0;
    return (
      <View style={stylecart}>
        <View style={header}>
          <TouchableOpacity onPress={this.goBack.bind(this)}>
            <Image style={iconStyle} source={back} />
          </TouchableOpacity>
        </View>
        {
          user ?
            <View style={{ flex: 1 }}>
              <FlatList
                data={arrCart}
                renderItem={({ item }) =>
                  <View margin={10}>
                    <ElevatedView elevation={6} style={stayElavated}>
                      <View style={product}>
                        <View style={viewImage}>
                          <Image source={{ uri: `${url}${item.images[0]}` }} style={imageStyle} />
                        </View>
                        <View style={viewTitle}>
                          <Text style={textStyleName}>{item.name.toUpperCase()}</Text>
                          <Text style={textStylePrice}>{item.price}$</Text>
                          <View style={add}>
                            <TouchableOpacity onPress={() => { this.incrQuantity(item.id) }}>
                              <Text style={textstyleadd}>+</Text>
                            </TouchableOpacity>

                            <Text style={textstyleadd}>{item.quantity}</Text>

                            <TouchableOpacity onPress={() => { this.decrQuantity(item.id) }}>
                              <Text style={textstyleadd}>-</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View style={viewShow}>
                          <TouchableOpacity onPress={() => { this.deleteProduct(item.id) }}>
                            <Text style={{ fontFamily: 'Avenir', color: colors.slideUI }}>X</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => { this.goDetail(item) }}>
                            <Text style={textStyleShow}>SHOW DETAIL</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </ElevatedView>
                  </View>            
                }
                keyExtractor={item => item.id}
              />
              <View >
                <TouchableOpacity style={tatolCart} onPress={this._senOrder.bind(this)}>
                  <Text style={textTatol}>TOTAL {total}$ CHECK OUT NOW</Text>
                </TouchableOpacity>
              </View>
            </View>
            : <Text>Sign in, please! </Text>
      }
      </View>
    );
  }
}
function mapStoreToProps(state) {
  return {
    arrCart: state.arrCart,
    user: state.isSignIn,
  };
}
export default connect(mapStoreToProps, { updateProductsCart })(Cart);

const { width, height } = Dimensions.get('window');
const imageWidth = (width - 100) / 3;
const imageHeight = (imageWidth / 361) * 452;
const styles = StyleSheet.create({
  stylecart: {
    flex: 13,
    backgroundColor: '#DFDFDF'
  },
  product: {
    backgroundColor: 'white',
    flexDirection: 'row',
    margin: 5,
    borderRadius: 2,
  },
  header: {
    height: width / 7,
    backgroundColor: colors.headerUI,
    flexDirection: 'row',
    padding: width / 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  iconStyle: {
    width: width / 10,
    height: height / 15,
  },
  viewImage: {
    margin: 5,
  },
  imageStyle: {
    width: imageWidth,
    height: imageHeight,
    flex: 1,
    resizeMode: 'center'
  },
  viewTitle: {
    flex: 90,
    justifyContent: 'space-between',
    margin: 5,
  },
  textStyleName: {
    paddingLeft: 15,
    color: colors.darkgrayishblue,
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  textStylePrice: {
    paddingLeft: 15,
    color: colors.brightorange,
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Avenir'
  },
  add: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  textstyleadd: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewShow: {
    justifyContent: 'space-between',
    margin: 5,
    alignItems: 'flex-end',
  },
  textStyleShow: {
    color: '#C21C70',
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Avenir',
    textAlign: 'right',
  },
  tatolCart: {
    backgroundColor: colors.brightred,
    margin: width / 38,
    alignItems: 'center',
    padding: 15,
  },
  textTatol: {
    color: 'white',
    fontSize: 15,
  },
  stayElavated: {
    backgroundColor: '#FFF',
  },
})
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, FlatList, AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';
import { updateProductsCart } from '../../Redux/Reducer/CreateAction.js';
import saveCart from "../../Redux/API/saveCart.js";
import getToken from '../../Redux/API/getToken';
import sendOrder from '../../Redux/API/sendOrder';


const url = "http://192.168.56.1:80/app/images/product/";

class Cart extends Component {
  goDetail(product) {
    this.props.navigation.navigate('PRODUCTDETAIL', { product });
  }
  deleteProduct(productID) {
    // const { arrCart } = this.props;
    // //console.log("mang" , arrCart);
    // var i = arrCart.map(e => { return e.id }).indexOf(productID);
    // // console.log("vị trí thứ :",i);
    // if (i > -1) {
    //   arrCart.splice(i, 1);
    //   console.log("mang moi 1:", arrCart);
    //   this.props.updateProductsCart(arrCart, console.log(arrCart, "UPDATE PRODUCT CART"));
    //   saveCart(arrCart);
    //   return arrCart;
    // }
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
            'Bạn chắc chắn muốn xóa sàn phẩm này ?',
            [
              { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              { text: 'OK', onPress: () => this.deleteProduct(productID) },
            ],
          )
        }
      }
      return e;
    });
    // console.log(newarrCart, "mang moi");
    this.props.updateProductsCart(newarrCart);
    saveCart(newarrCart);
  }// Xóa số lượng của sản phẩm
  async _senOrder() {
    try {
      var token = await getToken();
      var arrayDetail = this.props.arrCart.map(e => ({ id: e.id, quantity: e.quantity }));
      // console.log(token, "TOKEN");
      // console.log(arrayDetail, "ARAYDETAIL");
      const kq = await sendOrder(token, arrayDetail);
      if (kq === "THEM_THANH_CONG") return this._Success();
      return console.log("LOI");
    } catch (error) {
      console.log(error, "LOI");
    }
  }
  _Success() {
    this.props.updateProductsCart([]);
    saveCart([]);
  }
  render() {
    const { stylecart, product, viewImage, viewTitle, viewShow, textstyleadd, imageStyle, tatolCart, textTatol, textStyle0, textStyle2, textStyle1, add } = styles;
    const { arrCart, user } = this.props;
    // console.log("mang" , arrCart);
    const arrTotal = arrCart.map(e => e.price * e.quantity);
    const total = arrTotal.length ? arrTotal.reduce((a, b) => a + b) : 0;
    return (
      <View style={stylecart}>
        {
          user ?
            <View style={{ flex: 1 }}>
              <FlatList
                data={arrCart}
                renderItem={({ item }) =>
                  <View style={product} >
                    <View style={viewImage}>
                      <Image source={{ uri: `${url}${item.images[0]}` }} style={imageStyle} />
                    </View>
                    <View style={viewTitle}>
                      <Text style={textStyle0}> {item.name.toUpperCase()} </Text>
                      <Text style={textStyle1}> {item.price}$ </Text>
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
                        <Text>X</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { this.goDetail(item) }}>
                        <Text style={textStyle2}>SHOW DETAIL</Text>
                      </TouchableOpacity>
                    </View>
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
            : <Text>Vui long dang nhap </Text>
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
  },
  product: {
    margin: width / 38,
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
  },
  viewImage: {
    margin: 10,
  },
  imageStyle: {
    width: imageWidth,
    height: imageHeight,
  },
  viewTitle: {
    justifyContent: 'space-between',
    margin: 10,
  },
  textStyle0: {
    color: 'gray',
    fontSize: 15,
  },
  textStyle1: {
    color: '#c6386b',
    fontSize: 15,
  },
  add: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textstyleadd: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  viewShow: {
    justifyContent: 'space-between',
    margin: 10,
    alignItems: 'flex-end',
  },
  textStyle2: {
    color: '#c6386b',
    fontSize: 10,
  },
  tatolCart: {
    backgroundColor: '#28b08a',
    margin: width / 38,
    alignItems: 'center',
    padding: 15,
  },
  textTatol: {
    color: 'white',
    fontSize: 15,
  }
})
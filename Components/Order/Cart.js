import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, FlatList, Alert } from 'react-native';
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
    this.props.updateProductsCart([]);
    saveCart([]);
  }
  render() {
    const { stylecart, product, viewImage, viewTitle, viewShow, textstyleadd, imageStyle, tatolCart, textTatol, textStyleName, textStyleShow, textStylePrice, add } = styles;
    const { arrCart, user } = this.props;
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
                      <Text style={textStyleName}>{item.name.toUpperCase()} </Text>
                      <Text style={textStylePrice}>{item.price}$ </Text>
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
                        <Text style={{ fontFamily: 'Avenir', color: '#969696' }}>X</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { this.goDetail(item) }}>
                        <Text style={textStyleShow}>SHOW DETAIL</Text>
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
    margin: width / 38,
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
    borderRadius: 2,
  },
  viewImage: {
    margin: 10,
  },
  imageStyle: {
    width: imageWidth,
    height: imageHeight,
    flex: 1,
    resizeMode: 'center'
  },
  viewTitle: {
    flex: 80,
    justifyContent: 'space-between',
    margin: 5,
  },
  textStyleName: {
    paddingLeft: 20,
    color: '#A7A7A7',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  textStylePrice: {
    paddingLeft: 20,
    color: '#C21C70',
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Avenir'
  },
  add: {
    justifyContent: 'space-around',
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
  textStyleShow: {
    color: '#C21C70',
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Avenir',
    textAlign: 'right',
  },
  tatolCart: {
    backgroundColor: '#4895F0',
    margin: width / 38,
    alignItems: 'center',
    padding: 15,
  },
  textTatol: {
    color: 'white',
    fontSize: 15,
  }
})
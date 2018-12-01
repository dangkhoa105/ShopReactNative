import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { getDataTypesThunk, getTopProductsThunk, updateProductsCart } from '../../../Redux/Reducer/CreateAction.js';
import getCart from '../../../Redux/API/getCart.js';
import Banner from './Container/Banner.js';
import Sideproduct from './Container/Sideproduct.js';
import TopProduct from './Container/TopProduct.js';


class Home extends Component {
  componentDidMount(){
    this.props.getDataTypesThunk();
    this.props.getTopProductsThunk(); 
    //Get Cart notification
    getCart().then(arrCart => { console.log(arrCart,"GET");
      this.props.updateProductsCart(arrCart);
    })
  }
  goProducts(type){
    this.props.navigation.navigate('PRODUCT',{type});
  }
 
  goProductDetails(product){
    this.props.navigation.navigate('PRODUCTDETAIL',{product} );
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>   
          <Banner goCollection={this.goProducts.bind(this)}/> 
          <Sideproduct goProduct={this.goProducts.bind(this)} />
          <TopProduct goProductDetails={this.goProductDetails.bind(this)}/>
      </ScrollView>
    );
  }
}
function mapStoreToProps(state){
  return{
    arrType: state.arrType,
    arrTopProducts: state.arrTopProducts,
    arrCart : state.arrCart,
  };
}
export default connect(mapStoreToProps, {getDataTypesThunk, getTopProductsThunk,updateProductsCart})(Home);

var { height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        height:height*2.25,
    },
})
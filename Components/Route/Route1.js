import React, { Component } from 'react';
import { Dimensions} from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import Main from '../Main/Main';
import Menu from '../Main/Menu.js';
import ChangeInfo from '../Authentication/ChangeInfo.js';
import Authentication from '../Authentication/Authentication';
import OrderHistory from '../Order/OrderHistory.js';
import { TABBAR, CombineScreen } from './Route';
import Header from '../Main/Header';
import Search from '../Main/Search';
import Cart from '../Order/Cart'
import IconCart from './TabBarIcon/IconCart';
import Contact from '../Main/Contact';
import ProductDetail from '../Main/Home/Product/ProductDetail';


var {width} = Dimensions.get('window');

export const SIDEMAIN = DrawerNavigator({
    First: {
        screen: Main
    },
    FormChangeInfo: {
        screen: ChangeInfo
    },
    FormOrderHistory:{
        screen: OrderHistory
    },
    FormAuthen:{
        screen: Authentication
    },
    FormSearch:{
        screen: Search
    },
    FormHeader:{
        screen: Header
    },
    FormCart:{
        screen: Cart
    },
    FormIconCart:{
        screen: IconCart
    },
    FormContact:{
        screen: Contact
    },
    FormProductDetail:{
        screen: ProductDetail
    }
},
{
    initialRouteName: 'First',
    drawerWidth: width / 1.3,
    drawerPosition: 'left',
    contentComponent: props => <Menu{...props}/>
})

export default StackNavigator({
    sideBar: SIDEMAIN,
    screenMain: TABBAR,
},{
    headerMode: "none"
})


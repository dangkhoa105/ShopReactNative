
import React, { Component } from 'react';
import { Dimensions} from 'react-native';
import { DrawerNavigator } from'react-navigation';
import Main from '../Main/Main';
import Menu from '../Main/Menu.js';
import ChangeInfo from '../Authentication/ChangeInfo.js';
import Authentication from '../Authentication/Authentication';
import OrderHistory from '../Order/OrderHistory.js';


var {width} = Dimensions.get('window');

export const SIDEMAIN = DrawerNavigator({
    First: {
        screen: Main
    },
    FormChangeInfo: {
        screen:ChangeInfo
    },
    FormOrderHistory:{
        screen:OrderHistory
    },
    FormAuthen:{
        screen: Authentication
    }
},
{
    initialRouteName: 'First',
    drawerWidth: width / 1.5,
    drawerPosition: 'left',
    contentComponent: props => <Menu{...props}/>
})

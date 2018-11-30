
import React, {Component} from 'react';
import { Dimensions} from 'react-native';
import {DrawerNavigator, StackNavigator} from'react-navigation';
import Main from '../Main/Main';
import Menu from '../Main/Menu.js';
import ChangeInfo from '../Authentication/ChangeInfo.js';
import Authentication from '../Authentication/Authentication';
import Registry from '../Authentication/Registry.js';
import OrderHistory from '../Order/OrderHistory.js';
//import Menu from '../Main/Menu.js';


var {width, height} = Dimensions.get('window');

// export const AUTHENTICATION = StackNavigator({
//     FORMLOGIN:{screen:Authentication, navigationOptions:{header:null}},
//     FORMREGISTRY:{screen:Registry, navigationOptions:{header:null}},
// })

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
    initialRouteName:'First',
    drawerWidth: width/1.5,
    drawerPosition:'left',
    contentComponent: props => <Menu{...props}/>
})

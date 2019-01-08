import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Linking } from 'react-native';
import MapView from 'react-native-maps';


import location from '../../Image/location.png';
import email from '../../Image/mail.png';
import phone from '../../Image/phone.png';
import web from '../../Image/web.png';
import back from '../../Image/back_white.png';

import ElevatedView from 'react-native-elevated-view'
import colors from '../../Design/Color';

export default class Contact extends Component{
    openLinking() {
        Linking.openURL('https://www.uit.edu.vn');
    }
    goBack(){
        this.props.navigation.navigate('First');
    }
    render(){
        const { styleContact, header, iconStyle, viewMap, viewTitle, viewRow, imageStyle, textStyle, textStyle1, viewRowBottom } = styles;
        return(
            <View style={styleContact}>
                <View style={header}>
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <Image style={iconStyle} source={back} />
                    </TouchableOpacity>
                </View>
                <ElevatedView elevation={5} style={viewMap}>
                    <MapView style={{width:350,height:200}}
                        initialRegion={{
                            latitude: 10.870645,
                            longitude: 106.803424,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                    <MapView.Marker
                        coordinate={{ latitude: 10.870645, longitude: 106.803424 }}
                        title="University of Information Technology"
                    />
                    </MapView>
                </ElevatedView>
                <ElevatedView elevation={5} style={viewTitle}>
                    <View style={viewRow}>
                        <Image source={location} style={imageStyle}/>
                        <Text style={textStyle}>Khu phố 6, Phường Linh Trung, Quận Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam</Text>
                    </View>
                    <View style={viewRow}>
                        <Image source={phone} style={imageStyle}/>
                        <Text style={textStyle}>+84 28 3725 2002</Text>
                    </View>
                    <View style={viewRow}>
                        <Image source={email} style={imageStyle}/>
                        <Text style={textStyle}>info@uit.edu.vn</Text>
                    </View>
                        <View style={viewRowBottom}>                           
                            <Image source={web} style={imageStyle}/>  
                            <TouchableOpacity onPress={this.openLinking}>                        
                                <Text style={textStyle1}>https://www.uit.edu.vn</Text>         
                            </TouchableOpacity>                                        
                        </View>
                </ElevatedView>       
            </View>
        );
    }
}
const {width, height}= Dimensions.get('window');
const styles=StyleSheet.create({
    styleContact: {
        flex: 1, 
        backgroundColor: colors.white,
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
    viewMap: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#FFFFFF',
        margin: 10,
        borderRadius: 2,      
    },
    viewTitle: {
        padding: 10,
        flex: 1,
        backgroundColor: '#FFF',
        margin: 10,
        marginTop: 0,
        borderRadius: 2,    
    },
    viewRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: '#D6D6D6'
    },
    imageStyle: {
        width: width / 11,
        height: height / 18,
        margin: 15
    },
    textStyle: {
        fontSize: 15,
        fontFamily: 'Avenir',
        color: '#AE005E',
        fontWeight: '500',
        width: width / 1.4,
    },
    textStyle1: {
        fontSize: 15,
        fontFamily: 'Avenir',
        color: 'blue',
        fontWeight: '500',
        width: width / 1.4,
        textDecorationLine: 'underline',
    },
    viewRowBottom: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stayElavated: {
        backgroundColor: '#FFF',
    },
})
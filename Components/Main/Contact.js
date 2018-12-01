import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import MapView from 'react-native-maps';

import location from '../../Image/location.png';
import email from '../../Image/mail.png';
import phone from '../../Image/phone.png';
import web from '../../Image/web.png';

export default class Contact extends Component{
    render(){
        const { styleContact, viewMap, viewTitle, viewRow, imageStyle, textStyle, viewRowBottom } = styles;
        return(
            <View style={styleContact}>
                <View style={viewMap}>
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
                </View>
                <View style={viewTitle}>
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
                        <Text style={textStyle}>https://www.uit.edu.vn/</Text>
                    </View>
                </View>
            </View>
        );
    }
}
const {width, height}= Dimensions.get('window');
const styles=StyleSheet.create({
    styleContact: {
        flex: 1, 
        backgroundColor: '#F6F6F6'
    },
    viewMap: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#FFFFFF',
        margin: 10,
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    viewTitle: {
        padding: 10,
        flex: 1,
        backgroundColor: '#FFF',
        margin: 10,
        marginTop: 0,
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    viewRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#D6D6D6'
    },
    imageStyle: {
        width: width / 11,
        height: height / 18,
        margin: 20
    },
    textStyle: {
        fontFamily: 'Avenir',
        color: '#AE005E',
        fontWeight: '500',
        width: width / 1.5,
    },
    viewRowBottom: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from 'react-native';
import MapView from 'react-native-maps';

import location from '../../Image/location.png';
import email from '../../Image/mail.png';
import phone from '../../Image/phone.png';
import message from '../../Image/message.png';

export default class Contact extends Component{
    render(){
        const {styleContact, viewMap, viewTitle, viewRow, imageStyle, textStyle, viewRowBottom} = styles;
        return(
            <View style={styleContact}>
                <View style={viewMap}>
                    {/* <Text>MAP</Text> */}
                    <MapView style={{width:300,height:200,}}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
                </View>
                <View style={viewTitle}>
                    <View style={viewRow}>
                        <Image source={location} style={imageStyle}/>
                        <Text style={textStyle}>90 Le Thi Rieng/ Ben Thanh Dist</Text>
                    </View>
                    <View style={viewRow}>
                        <Image source={phone} style={imageStyle}/>
                        <Text style={textStyle}>(+84) 0966141920</Text>
                    </View>
                    <View style={viewRow}>
                        <Image source={email} style={imageStyle}/>
                        <Text style={textStyle}>nguyenthi.ngoctrang.297@gmail.com</Text>
                    </View>
                    <View style={viewRowBottom}>
                        <Image source={message} style={imageStyle}/>
                        <Text style={textStyle}>(+84) 01674271724</Text>
                    </View>
                </View>
            </View>
        );
    }
}
const {width, height}= Dimensions.get('window');
const styles=StyleSheet.create({
    styleContact:{
        flex:13,
    },
        viewMap:{
            flex:1,
            margin: width/38,
            backgroundColor:'green',
            alignItems:'center',
            justifyContent:'center',
        },
        viewTitle:{
            flex:1,
            margin: width/38,
            backgroundColor:'white',
            padding:width/38,
            marginTop:0,
            marginBottom:0,
        },
            viewRow:{
                borderColor:'gray',
                borderBottomWidth:1,
                flexDirection:'row',
                flex:1,
                justifyContent:'space-between',
                alignItems:'center',
            },
                imageStyle:{
                    width:width/13,
                    height:height/18,
                },
                textStyle:{
                    color:'#c6386b',
                },
            viewRowBottom:{
                flexDirection:'row',
                flex:1,
                justifyContent:'space-between',
                alignItems:'center',
            }

})
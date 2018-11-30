import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';
import iconMenu from '../../Image/icon-menu.png';
import iconLogo from '../../Image/cart0.png';
import search from '../../Redux/API/search';
import { searchProduct } from '../../Redux/Reducer/CreateAction';

class Header extends Component{
    constructor(props){
        super(props);
        this.state={
            contentSearch:'',
        }
    }
    _search(){
        const {contentSearch} = this.state;
        search(contentSearch)
        .then(arrproduct => 
            this.props.searchProduct(arrproduct)
        )
        .catch(err => this._searchFail())
    }
    _searchFail(){
        Alert.alert(
            'Search',
            'Product not found',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
          )
    }
    render(){
        return(
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity
                        onPress={this.props.onOpen}
                    >
                        <Image 
                            style={styles.imageMenu}
                            source={iconMenu}
                        />
                    </TouchableOpacity>
                    <View style={styles.hearderSearch}>
                        <TextInput
                            underlineColorAndroid='transparent'
                            style={styles.textinput}
                            value={this.state.contentSearch}
                            onChangeText={(contentSearch)=>{this.setState({contentSearch})}}
                            onFocus={ this.props.goSear}
                            onSubmitEditing={this._search.bind(this)}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={this.props.goSear}
                    >
                        <Image 
                            style={styles.imageCart}
                            source={iconLogo}
                        />
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }
}
export default  connect(null,{searchProduct})(Header);
var {width, height} = Dimensions.get('window');
const styles=StyleSheet.create({
    header: {
        flex: 1,
        backgroundColor: '#4895F0',
        justifyContent: 'space-around',
        padding: width / 25,
        paddingTop: width / 30,
        height: height / 100
    },
    headerTop: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageMenu: {
        width: width / 15,
        height: height / 18,
    },
    imageCart: {
        width: width / 10,
        height: height / 15,
    },
    text: {
        fontSize: width / 23,
        color: 'white',
    },
    hearderSearch: {
        flex: 1,
        marginTop: width / 100,
    },
    textinput: {
        backgroundColor: 'white',
        fontSize: width / 40,
        borderRadius: 10,
        marginLeft: 14,
        marginRight: 10,
        height: 30
    },
})
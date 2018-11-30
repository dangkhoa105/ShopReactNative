import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';
import iconMenu from '../../Image/menu.png';
import iconLogo from '../../Image/cart.png';
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
                            placeholder="What do you want to buy ?"
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
        backgroundColor: '#4895F0',
        justifyContent: 'space-around',
        padding: width / 25,
        paddingTop: width / 30,
        height: height / 12,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageMenu: {
        width: width / 18,
        height: height / 20,
    },
    imageCart: {
        width: width / 17,
        height: height / 20,
        marginRight: width / 32,
    },
    text: {
        fontSize: width / 23,
        color: 'white',
    },
    hearderSearch: {
        backgroundColor: 'white',
        marginTop: width / 100,
        justifyContent: 'space-around',
    },
    textinput: {
        backgroundColor: 'white',
        borderRadius: 10,
        height: height / 20,
        width: width / 1.5,
        paddingLeft: 10,
        paddingVertical: 1 
    },
})
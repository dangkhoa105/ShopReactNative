import React,{ Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './Header.js';
import { TABBAR } from '../Route/Route.js';
import getToken from '../../Redux/API/getToken';
import CheckLogin from '../../Redux/API/checklogin';
import { OnSignIn } from '../../Redux/Reducer/CreateAction';
import { connect } from 'react-redux';
import RefreshToken from '../../Redux/API/refreshToken';

class Main extends Component {
  constructor(props){
    super(props);
  }  
  componentDidMount() {
    getToken()
      .then(token => CheckLogin(token))
      .then(res => { this.props.OnSignIn(res.user) })
      .catch(err => console.log(err, "TOKEN KO HOP LE"))

    setInterval(RefreshToken,60000);
  }
  openMenu() {
    this.props.navigation.navigate('DrawerOpen');
  }
  goSearch(){
    this.props.navigation.navigate('tabSearch');
  }
  render() {
    const { container, content } = styles
    return (
      <View style={container}>
        <Header  onOpen={this.openMenu.bind(this)} goSear={this.goSearch.bind(this)}/>
        <View style={content}>
            <TABBAR />
        </View>
      </View>
    );
  }
}


export default connect(null,{OnSignIn})(Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4895F0',
  },
  content: {
    flex: 14.5,
  },
})
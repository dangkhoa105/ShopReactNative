import React, { Component } from 'react';
import {SIDEMAIN} from './Components/Route/Route1.js';
import store from './Redux/Store.js';
import {Provider} from 'react-redux';


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
         <SIDEMAIN/>
      </Provider>
    );
  }
}

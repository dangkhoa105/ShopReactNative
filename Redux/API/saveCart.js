import {AsyncStorage} from 'react-native';

const saveCart = async(arrCart)=> {
    try {
      //console.log(arrCart,"ADD ASYNC");
      await AsyncStorage.setItem("@cart:key", JSON.stringify(arrCart));
      //await AsyncStorage.setItem("@cart:key", JSON.stringify([]));
    } 
    catch (error) { console.log(e);    }
  }
  export default saveCart;
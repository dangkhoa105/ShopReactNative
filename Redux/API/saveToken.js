import {AsyncStorage} from 'react-native';

const saveToken = async(token)=> {
    try {
      // console.log(token,"ADD ASYNC");
      await AsyncStorage.setItem("@token:key", token);
      //await AsyncStorage.setItem("@cart:key", JSON.stringify([]));
    } 
    catch (error) { console.log(e);    }
  }
  export default saveToken;
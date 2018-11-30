import {AsyncStorage} from 'react-native';

const getToken = async()=>{
    try {
        const token = await AsyncStorage.getItem("@token:key");
        // console.log(token,"GET TOKEN");
        if(token !== null)
        {
            return token;
        }
        return '';
    } catch (error) {
        return '';
    }
}
export default getToken;
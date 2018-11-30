import {AsyncStorage} from 'react-native';

const getCart = async()=>{
    try {
        const arrCart = await AsyncStorage.getItem("@cart:key");
        console.log(arrCart,"GET CART");
        if(arrCart !== null)
        {
            return JSON.parse(arrCart);
        }
        return [];
    } catch (error) {
        return [];
    }
}
export default getCart;
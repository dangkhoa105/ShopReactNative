import saveCart from '../API/saveCart.js';
import getCart from '../API/getCart.js';
//const arrProduct = [{product:[], quantify:"1"}];

const ReducerArrCart = (state = [], action) => {
    if (action.type === "ADD_PRODUCT_CART") {
        const arrCart = state.concat(action.product);
        console.log(arrCart,"ADD PRODUCT CART");
        return arrCart;
    }
    if( action.type === "UPDATE_PRODUCT_CART") {   
        return action.products;
    }
    // if(action.type === "GET_CART_PRODUCT_ASYNC") {
    //     return action.products;
    // }
    // if(action.type === "DELETE_PRODUCT_FROM_CART"){
    //     console.log(state,"old arr");
    //     var i = state.map(e=> {return e.id}).indexOf(action.productID);
    //     console.log(action.productID,"action.productID");
    //     console.log("vị trí thứ : ",i);
    //     if(i > -1){
    //         var object = state.splice(i,1);
    //         console.log("Object bị xóa: ",object);
    //     }
    //     console.log(state,"new arr");
    //     return arrnew=state;
    //     // console.log(state.filter(e => {return e.id !== action.product}),"test")
    //     // return state.filter(e => {return e.id !== action.product});
    // }
    return state;
}
export default ReducerArrCart;
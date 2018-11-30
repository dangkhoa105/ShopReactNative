import {getTypes, getTopProducts} from '../API/getData.js';
import getListProduct from '../API/getListProduct';

export function fetchStart(){
    return { type: 'FETCH_START'};
}//khi mới bật app, data load server về chưa kịp

export function fetchErr(){
    return {type:'FETCH_ERR'};
}// khi load data từ server lỗi

export function fetchSuccessTypes(arrType){
    return {type: 'FETCH_SUCCESS_TYPES',data:arrType};
}//khi load data thành công, load type váy, đầm

export function getDataTypesThunk(){
    return dispatch => {
        dispatch(fetchStart());
        getTypes()
        .then(type => dispatch(fetchSuccessTypes(type)))
        .then(()=> dispatch(fetchStart()))
        .catch(()=> dispatch(fetchErr()));
    }
}//get data type dùng redux thunk
export function fetchSuccessTopProducts(arrTopProducts){
    return {type: 'FETCH_SUCCESS_TOPPRODUCTS', dataTopProducts:arrTopProducts};
}////khi load data thành công load top product
export function getTopProductsThunk(){
    return dispatch => {
        dispatch(fetchStart());
        getTopProducts()
        .then(product=> dispatch(fetchSuccessTopProducts(product)))
        .then(()=> dispatch(fetchStart()))
        .catch(()=> dispatch(fetchErr()));
    }
}//get data top product dùng redux thunk
export function addProductToCart(product){
    return {
        type: 'ADD_PRODUCT_CART',
        product: product,
    };
}//thêm một sản phẩm vào giỏ hàng

export function updateProductsCart(products){
    return {
        type: 'UPDATE_PRODUCT_CART',
        products,
    };
}//update sản phẩm trong giỏ hàng tằng số lượng, giảm số luọng, xóa product v.v...
export function login(){
    return {
        type: 'FILTER_LOGIN',
    };
}//filter hiển thị khi login
export function registry(){
    return {
        type: 'FILTER_REGISTRY',
    };
}//filter hiển thị khi registry
export function OnSignIn(user){
    return{
        type:'IS_SIGN_IN',
        user
    };
}//khi đăng nhập
export function OnSignOut(){
    return{
        type:'IS_SIGN_OUT',
    };
}//khi không đằng nhập, hay nhấn thoát


export function fetchListProduct(listProduct){
    return {
        type:'FETCH_LIST_PRODUCTS',
        listProduct
    };
}//load thành công list product

export function getListProductsThunk(idType,page){
    return dispatch => {
        dispatch(fetchStart());
        getListProduct(idType,page)
        .then(listproduct=> dispatch(fetchListProduct(listproduct)))
        .then(()=> dispatch(fetchStart()))
        .catch(()=> dispatch(fetchErr()));
    }
}// dùng redux thunk cho load list product

export function refreshListProduct(){
    return {
        type:'REFRESH_LIST_PRODUCTS',
    }
}// tra ve list product = []

export function loadpage(){
    return {
        type: 'LOAD_PAGE',
    }
}//get page

export function setRefre(){
    return{
        type:'SET_REFRE',
    }
}//set refresh

export function searchProduct(arrProduct){
    return {
        type:'SEARCH_PRODUCT',
        arrProduct
    }
}//search

export function order(arrOrder){
    return{
        type: 'ORDER_HISTORY',
        arrOrder
    }
}//order history




























// export function name(name){
//     return{
//         type:'NAME_REGISTER',
//         name,
//     };
// }

// export function deleteProductFromCart(productID){
//     return {
//         type: 'DELETE_PRODUCT_FROM_CART',
//         productID,
//     }
// }
// export function getCartProductAsync(products){
//     return{
//         type:'GET_CART_PRODUCT_ASYNC',
//         products,
//     }
// }
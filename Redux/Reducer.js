import {combineReducers} from 'redux';
import ReducerTypes from './Reducer/ReducerTypes.js';
import ReducerIsLoading from './Reducer/ReducerIsLoading.js';
import ReducerErr from './Reducer/ReducerErr.js';
import ReducerTopProducts from './Reducer/ReducerTopProducts.js';
import ReducerarrCart from './Reducer/ReducerarrCart.js';
import ReducerIsLogin from './Reducer/ReducerIsLogin';
import ReducerName from './Reducer/ReducerName';
import ReducerIsSignIn from './Reducer/ReducerIsSignIn';
import ReducerProducts from './Reducer/ReducerProducts';
import ReducerPage from './Reducer/ReducerPage';
import ReducerRefre from './Reducer/ReducerRefre';
import ReducerSearch from './Reducer/ReducerSearch';
import ReducerOrderHistory from './Reducer/ReducerOrderHistory';

const  Reducer = combineReducers ({
    arrType: ReducerTypes,
    isLoading: ReducerIsLoading,
    isErr: ReducerErr,
    arrTopProducts: ReducerTopProducts,
    arrCart: ReducerarrCart,
    isLogin: ReducerIsLogin,
    name: ReducerName,
    isSignIn: ReducerIsSignIn,
    listProducts: ReducerProducts,
    page : ReducerPage,
    refre : ReducerRefre,
    arrproduct: ReducerSearch,
    arrOrder: ReducerOrderHistory,
})

export default Reducer;

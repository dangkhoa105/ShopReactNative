const ReducerProducts = (state = [] , action) =>{
    if(action.type === 'FETCH_LIST_PRODUCTS'){
        return  state.concat(action.listProduct);
      }
      if(action.type === 'REFRESH_LIST_PRODUCTS'){
        return  [];
      }
      return state;
}
export default ReducerProducts;
const ReducerTopProducts = (state = [] , action)=>{
    if(action.type === 'FETCH_SUCCESS_TOPPRODUCTS'){
      return  action.dataTopProducts;
    }
    return state;
}
export default ReducerTopProducts;
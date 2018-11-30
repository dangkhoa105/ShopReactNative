const ReducerSearch = (state = [], action) => {
    if(action.type === 'SEARCH_PRODUCT'){
        return action.arrProduct;
    }
    return state;
}
export default ReducerSearch;
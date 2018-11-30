const ReducerRefre = (state = false, action) => {
    if(action.type === 'SET_REFRE'){
        return !state;
    }
    return state;
}
export default ReducerRefre;
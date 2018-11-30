const ReducerErr = (state = false , action)=>{
    if(action.type === 'FETCH_ERR') return !state;
    return state;
}
export default ReducerErr;
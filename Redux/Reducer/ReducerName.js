const ReducerName = (state = '', action) => {
    if(action.type === 'NAME_REGISTER'){
        return action.name;
    }
    return state;
}
export default ReducerName;
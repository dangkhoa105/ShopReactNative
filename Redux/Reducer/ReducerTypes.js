
//const defaultStateTypes=[{id:'', nameType:'', imageType:''}];

const ReducerTypes = (state = [] , action ) => {
    if(action.type === 'FETCH_SUCCESS_TYPES'){
        //return {state: action.data}
        return action.data;
    }
    return state;
}

export default ReducerTypes;
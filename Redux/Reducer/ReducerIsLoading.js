const ReducerIsLoading = (state = false, action)=> {
    if (action.type === 'FETCH_START')
        return  !state;
    return state;
}

export default ReducerIsLoading;
const ReducerPage =(state = 1, action)=>{
    if(action.type === 'LOAD_PAGE'){
        return state+1;
    }
    return state;
}
export default ReducerPage;
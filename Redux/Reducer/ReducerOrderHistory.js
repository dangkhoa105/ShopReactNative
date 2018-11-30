const ReducerOrderHistory = (state = [], action)=>{
    if(action.type === 'ORDER_HISTORY'){
        return action.arrOrder;
    }
    return state;
}
export default ReducerOrderHistory;
const ReducerIsLogin = (state = 'LOGIN', action)=>{
    
    if (action.type === 'FILTER_LOGIN')
        return 'LOGIN';

    if (action.type === 'FILTER_REGISTRY')
        return 'REGISTRY';
    
    return state;
}
export default ReducerIsLogin;
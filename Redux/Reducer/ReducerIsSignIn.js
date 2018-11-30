const ReducerIsSignIn = (state = '', action) => {
    if(action.type === 'IS_SIGN_IN'){
        return action.user;
    }
    if(action.type === 'IS_SIGN_OUT'){
        return '';
    }
    return state;
}
export default ReducerIsSignIn;
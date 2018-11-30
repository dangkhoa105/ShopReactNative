const URL = "http://192.168.56.1:80/app/check_login.php";
const CheckLogin = (token) => {
    // console.log(token,'token');
    // console.log(typeof token,'typeof token');
    // var token1 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InBla3VuIiwiaWF0IjoxNTI3OTEwMDU5LCJleHBpcmUiOjE1MjgwODI4NTl9.oY_BpS-_uGQ6qvoQj61FYHDrEWGofhBNSfDQUi8cZ_w';    
    // console.log(token1,"token1");
    
    return fetch (URL, {
        method: 'POST',
        headers: {
            "Content-Type":'application/json',
            "Accept": "application/json"
        },
        body: JSON.stringify({token})
    })
    .then(res => res.json());
}
export default CheckLogin;
const URL = "http://192.168.56.1:80/app/login.php";
const SignIn = (email, password) => {
    return fetch(URL, {
        method:'POST',
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        })
    })
    .then(res => res.json())
}
export default SignIn;
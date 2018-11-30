const URL = "http://192.168.56.1:80/app/change_info.php";
const changeInfoUser = (token, name, phone, address) => {
    // console.log(token, "TOKEN");
    // console.log(name, "NAME");
    // console.log(phone, "PHONE");
    // console.log(address, "ADDRESS");
    return fetch(URL, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Accept": "application/json"
        },
        body: JSON.stringify({token, name, phone, address})
    })
        .then(res => res.json());
}
export default changeInfoUser;
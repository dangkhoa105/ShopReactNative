const URL = "http://192.168.56.1:80/app/cart.php";
const sendOrder = (token, arrayDetail) => {
    
    return fetch (URL, {
        method: 'POST',
        headers: {
            "Content-Type":'application/json',
            "Accept": "application/json"
        },
        body: JSON.stringify({token, arrayDetail})
    })
    .then(res => res.text());
}
export default sendOrder;
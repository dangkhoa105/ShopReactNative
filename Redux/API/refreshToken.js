import saveToken from './saveToken';
import getToken from './getToken';

const URL = "http://192.168.56.1:80/app/refresh_token.php";
// const RefreshToken = (token) => {
//     return fetch(URL, {
//         method:'POST',
//         headers:{
//             "Content-Type":"application/json",
//             "Accept":"application/json"
//         },
//         body: JSON.stringify({token})
//     })
//     .then(res => res.text())
//     .then(tokennew => {
//         console.log(tokennew,"token NEW");
//         saveToken(tokennew);
//     })
// }Cách 1: chưa kt token có hay không, hợp lệ hay không\


const getnewToken = (token) => {
    return fetch(URL, {
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                body: JSON.stringify({token})
            })
            .then(res => res.text())
};
const RefreshToken = async () => {
    try {
        const token = await getToken();
        if(token === '' || token === 'TOKEN_KHONG_HOP_LE'){
            return console.log('Chua co token!!!')
        }
        const newToken = await getnewToken(token);
        await saveToken(newToken);
        // console.log(newToken, "token new");
    } catch (error) {
        console.log(error);
    }
}//Cách 2: kiếm tra luôn trong async

export default RefreshToken;
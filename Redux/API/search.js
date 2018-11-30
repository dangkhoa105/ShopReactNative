const search = (key ) => {
    return fetch(`http://192.168.56.1:80/app/search.php?key=${key}`)
    .then(res=> res.json())
}
export default search;
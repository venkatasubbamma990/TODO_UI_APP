const headers = {
    "content-type" : "application/json",
    Accept: "application/json",
}

const get = async (url) => {
    try{
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        })
        const result = await response.json();
        return result;
    }catch(err){
        console.log(err);
    }
}
const post = async () => {
    try{
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
        })
        const result = await response.json();
        return result;
    }catch(err){
        console.log(err);
    }
}
export {get , post}
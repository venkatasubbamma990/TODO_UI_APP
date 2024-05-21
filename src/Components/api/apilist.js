import Key from '../Clientvaribales.json'
 function apiurl(api) {
    switch(api){
        case "todoList" :
            return `${Key.domain}/getTodos`
       default:
         return Key.domain;
    }
 }
 export default apiurl
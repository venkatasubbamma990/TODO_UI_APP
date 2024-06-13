import Key from '../Clientvaribales.json'
 function apiurl(api) {
    switch(api){
        case "todoList" :
            return `${Key.domain}/getTodos`
        case "createTodo" :
            return `${Key.domain}/createTodos`
        case "deleteTodo" :
                return (todoID) =>  `${Key.domain}/deleteTodo/${todoID}`
        case "updateTodo" :
              return (todoID) =>  `${Key.domain}/updateTodo/${todoID}`
       default:
         return Key.domain;
    }
 }
 export default apiurl
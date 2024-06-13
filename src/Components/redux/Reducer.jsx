import * as types from "./Actiontypes";
const initialState = {
    todos : [],
   todoValue : ""

}
function reduce(state = initialState , action = {}) {
    switch(action.type){
        case  types.GET_TODOS_ACTION:
            return {
                ...state,
                todos :  [...action.payload] ,
            }
        case types.GET_TODOS_ACTION_FAIL:
                // Handle the error case if necessary
                return state;
        case types.CREATE_TODO_ACTION : 
        return {
           ...state,
            todos :[...state.todos ,  ]
        }
        case types.DELETE_TODO_ACTION : 
        return {
            ...state,
            todos : [action.payload]
        }
        case types.UPDATE_TODO_ACTION : 
        return {
            ...state,
            todos : [action.payload]
        }
     
            default:
                return state;
    }
}
export default reduce
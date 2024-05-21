import * as types from './Actiontypes'
const initialState = {
    todos : []


}
const reducer = (state = initialState , action ) => {
    switch(action.type){
        case  types.GET_TODOS:
            return {
                ...state,
                todos: [...state.todos, ...action.payload],
            }
         default:
            return state;
    }
}
export default reducer
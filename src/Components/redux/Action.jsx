import url from '../api/apilist';
import * as types from '../redux/Actiontypes'
import {get , post} from "../api/apimethods"

export const getTodosAction = () => {
    let apiurl = url("todoList")
    return async (dispatch) => {
        try {
            const response = await post(apiurl)
            let todolist ;
            if(response.success === 1){
               todolist = response?.data
                dispatch({
                    type: types.GET_TODOS_ACTION,
                    payload: todolist
                })
            }
        } catch (error) {
            dispatch({
                type: types.GET_TODOS_ACTION_FAIL,
                payload: error.message
            })
        }

    }
}
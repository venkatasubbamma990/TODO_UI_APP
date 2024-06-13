import url from '../api/apilist';
import * as types from './Actiontypes'
import {get , post} from "../api/apimethods"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// export const getTodosAction = () => {
//     let apiurl = url("todoList")
//     return async (dispatch) => {
//         try {
//             const response = await get(apiurl)
//             let todolist ;
//             if(response.success === 1){
//                todolist = response?.data
              
//             }
//             dispatch({
//                 type: types.GET_TODOS_ACTION,
//                 payload: todolist
//             })
//         } catch (error) {
//             dispatch({
//                 type: types.GET_TODOS_ACTION_FAIL,
//                 payload: error
//             })
//         }

//     }
// }
export const getTodosAction = () => {
    let apiurl = url("todoList");
    return async (dispatch) => {
        try {
            const response = await get(apiurl);
            console.log("res" , response)
            let todolist;
            if (response.status === "success") {
                todolist = response?.data;
                
            }
            dispatch({
                type: types.GET_TODOS_ACTION,
                payload: todolist
            });
        } catch (error) {
            dispatch({
                type: types.GET_TODOS_ACTION_FAIL,
                payload: error
            });
        }
    }
}


export const createTodoAction = (tododata) => {
    let apiurl = url("createTodo");
    return async (dispatch) => {
        try {
            const response = await post(apiurl , tododata );
            console.log("res" , response)
           
            if (response.status === "success") {
                dispatch(getTodosAction())
                
            }
            dispatch({
                type: types.CREATE_TODO_ACTION,
                payload: "create Successfully"
            });
        } catch (error) {
            dispatch({
                type: types.CREATE_TODO_ACTION_FAIL,
                payload: error
            });
        }
    }
}

export const deleteTodoAction = (todoID) => {
    let apiurl = url("deleteTodo")(todoID);
    return async (dispatch) => {
        try {
            const response = await post(apiurl);
            console.log("res" , response)
           
            if (response.status === "success") {
                dispatch(getTodosAction())
            }
            dispatch({
                type: types.DELETE_TODO_ACTION,
                payload: "deleted Successfully"
            });
        } catch (error) {
            dispatch({
                type: types.DELETE_TODO_ACTION_FAIL,
                payload: error
            });
        }
    }
}

export const updateTodoAction = (todoID  , tododata) => {
    console.log("todoID" , todoID)
    let apiurl = url("updateTodo")(todoID);
   return async (dispatch) => {
        try {
            const response = await post(apiurl , tododata)
            if(response.status === "success" && response.data.modifiedCount > 0){
                dispatch(getTodosAction())
            }
            dispatch({
                type: types.UPDATE_TODO_ACTION,
                payload: "updated Successfully"
            })
        }catch(err){
            dispatch({
                type: types.UPDATE_TODO_ACTION_FAIL,
                payload: err
            })
        }
   }
}


/* eslint-disable */

import { applyMiddleware, createStore, compose } from "redux";
//import rootReducer from "./rootReducer";
import reducer from "./Reducer";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
//import { loadState, persistState } from "./localStorage";


//  const middleware = [thunk];
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// if (process.env.NODE_ENV !== "production") {
//   middleware.push(logger);
// }

// let persistedData = loadState();
// export const store = createStore(
//     reducer,
//   persistedData,
//   composeEnhancers(applyMiddleware(...middleware))
// );

// store.subscribe(() => {
//   persistState(store.getState());
// }); 
const middleware = [thunk, logger];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
if (process.env.NODE_ENV !== "production") {
  middleware.push(logger);
}
const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleware))
  );
  export default store;


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';
import * as serviceWorker from './serviceWorker';

// Redux SetUp
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import AuthReducer from "./Store/Reducers/AuthReducer";

//middleware reduxThunk
const logger = store => {
    return next => {
        return action => {
            console.log('Middleware [Dispatching]', action);
            const result = next(action);
            console.log('Middleware [action]', store.getState());
            return result;
        }
    }
}

//store
const store = createStore(AuthReducer, applyMiddleware(logger, reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

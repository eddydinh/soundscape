import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import './index.css';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
//import logger from 'redux-logger'
import {SetCurrentPosReducer,
        OnInfowinEventReducer,
        OnRecordLatLngReducer,
        OnRequestMarkesReducer,
        PassFileNameReducer,
       OnResetReducer,
       SetMessageReducer} from './reducers';


import * as serviceWorker from './serviceWorker';
      

//Combined reducer

const rootReducer = combineReducers({SetCurrentPosReducer,
                                     OnInfowinEventReducer,
                                     OnRecordLatLngReducer,
                                     OnRequestMarkesReducer,
                                     PassFileNameReducer,
                                    OnResetReducer,
                                    SetMessageReducer});

//Global store
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

//
//ReactDOM.render(
//    
//    <Provider store ={store}>
//    <Container />
//</Provider>, document.getElementById('root'));

ReactDOM.render(
    
    <Provider store ={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
</Provider>, document.getElementById('root'));

    
  



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

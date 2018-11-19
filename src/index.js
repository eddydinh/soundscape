import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import Container from './containers/Container';
import {SetCurrentPosReducer,OnInfowinEventReducer} from './reducers';
import * as serviceWorker from './serviceWorker';

const logger = createLogger();

const rootReducer = combineReducers({SetCurrentPosReducer,OnInfowinEventReducer});
const store = createStore(rootReducer,applyMiddleware(logger));

ReactDOM.render(<Provider store ={store}>
    <Container />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

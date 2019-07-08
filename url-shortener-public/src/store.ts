import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import createHistory from 'history/createMemoryHistory';
import { routerMiddleware } from 'react-router-redux';

export const history = createHistory();

const initialState = {};

const middleware = [
    routerMiddleware(history),
    thunk
];

export const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
);
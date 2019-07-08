import { combineReducers } from 'redux';
import mainReducer from './mainReducer';
import recordReducer from './recordReducer';

export default combineReducers({
    mainReducer,
    recordReducer
});
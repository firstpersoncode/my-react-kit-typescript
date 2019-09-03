import { combineReducers } from 'redux';
import app from './app/reducer';

const createReducers = () =>
    combineReducers({
        app,
    });

export default createReducers;

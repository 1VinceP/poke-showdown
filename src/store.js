import { createStore, combineReducers } from 'redux';
import gameReducer from './redux/gameReducer';

const reducers = combineReducers({
    game: gameReducer
});

export default createStore( reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );
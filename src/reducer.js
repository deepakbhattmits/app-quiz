import quiz from './reducers/quiz';
import { combineReducers } from 'redux';

const mainReducer = combineReducers({
  quiz
});

export default mainReducer;
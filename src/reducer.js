/** @format */

import quiz from './reducers/quiz';
import { combineReducers } from 'redux';
// quiz
const mainReducer = combineReducers({
	quiz,
});

export default mainReducer;

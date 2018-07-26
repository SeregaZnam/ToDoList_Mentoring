import { combineReducers } from 'redux';
import categoryTitle from './categoryTitle';
import taskTitle from './taskTitle';

const todoApp = combineReducers({
	categoryTitle,
	taskTitle
});

export default todoApp;
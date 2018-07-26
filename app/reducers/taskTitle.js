import { CHANGE_DISABLED_TASK_INPUTS, HANDLE_CHECKED_TASK } from '../constants/index.js';
import { initialState } from '../store/initialState';

const taskTitle = (state = initialState, action) => {
	let categoryItems = state.categoryItemsRedux.slice();

	switch (action.type) {

		case CHANGE_DISABLED_TASK_INPUTS: 
			return Object.assign({}, state, {
				disabledTaskInputsRedux: action.payload.attributeDisabled
			});

		case HANDLE_CHECKED_TASK: 
			categoryItems[action.payload.indexCategory].taskList[action.payload.indexTask].flagChangeTask = !categoryItems[action.payload.indexCategory].taskList[action.payload.indexTask].flagChangeTask;
			return Object.assign({}, state, {
				categoryItemsRedux: categoryItems
			});

		default: return state;
	}
};

export default taskTitle;
import { CHANGE_INPUT_VALUE_CATEGORY_TITLE, ADD_CATEGORY_ITEM, DELETE_CATEGORY_ITEM, CHANGE_CATEGORY_TEXT, SUBMIT_CATEGORY_INPUT, CHANGE_INPUT_CATEGORY_ITEM, ADD_SUBCATEGORY_ITEM, GENERATION_LEVEL_CATEGORY, CHANGE_CHECKED_CATEGORY, CHANGE_DISABLED_TASK_INPUTS, HANDLE_CHECKED_TASK, ADD_TASK_IN_CATEGORY, HIDE_TASKS_COMPLETED_INPUT_SEARCH, SHOW_TASKS, HANDLE_MODAL_CLOSE, HANDLE_MODAL_SHOW, SAVE_MODAL_INFO, CHANGE_TEXT_MODAL_TASK, CHANGE_CHECKBOX_DONE_MODAL, CHANGE_VALUE_SELECT_MODAL } from '../constants/index.js';
import { initialState } from '../store/initialState';

const categoryTitle = (state = initialState, action) => {
	let categoryItems = state.categoryItemsRedux.slice();

	switch (action.type) {

		case CHANGE_INPUT_VALUE_CATEGORY_TITLE: 
			return Object.assign({}, state, { 
				inputValueRedux: action.payload.inputValueRedux 
			});

		case ADD_CATEGORY_ITEM:
			categoryItems.push(action.payload.categoryItemsRedux);
			return Object.assign({}, state, {
				inputValueRedux: '',
				categoryItemsRedux: categoryItems
			});

		case DELETE_CATEGORY_ITEM: 
			categoryItems.splice(action.payload.indexCategory, action.payload.indicesLength);
			return Object.assign({}, state, {
				categoryItemsRedux: categoryItems
			});

		case CHANGE_CATEGORY_TEXT:
			categoryItems[action.payload.indexCategory].flagChangeText = !categoryItems[action.payload.indexCategory].flagChangeText;

			return Object.assign({}, state, {
				categoryItemsRedux: categoryItems
			});

		case SUBMIT_CATEGORY_INPUT:
			categoryItems[action.payload.indexCategory].text = action.payload.elementValue;
			categoryItems[action.payload.indexCategory].flagChangeText = !categoryItems[action.payload.indexCategory].flagChangeText;

			return Object.assign({}, state, {
				categoryItemsRedux: categoryItems
			});

		case CHANGE_INPUT_CATEGORY_ITEM:
			categoryItems[action.payload.indexCategory].text = action.payload.elementValue;

			return Object.assign({}, state, {
				categoryItemsRedux: categoryItems
			});

		case ADD_SUBCATEGORY_ITEM:
			categoryItems.splice(action.payload.indexCategory + 1, 0, action.payload.newSubCategoryItem);
			return Object.assign({}, state, {
				categoryItemsRedux: categoryItems
			});

		case GENERATION_LEVEL_CATEGORY:
			return Object.assign({}, state, {
				categoryItemsRedux: action.payload.categoryItemsRedux
			});

		case CHANGE_CHECKED_CATEGORY:
			categoryItems[action.payload.indexCategory].checkedCategory = !categoryItems[action.payload.indexCategory].checkedCategory;
			return Object.assign({}, state, {
				categoryItemsRedux: categoryItems
			});

		case CHANGE_DISABLED_TASK_INPUTS: 
			return Object.assign({}, state, {
				disabledTaskInputsRedux: action.payload.attributeDisabled
			});

		case HANDLE_CHECKED_TASK: 
			categoryItems[action.payload.indexCategory].taskList[action.payload.indexTask].flagChangeTask = !categoryItems[action.payload.indexCategory].taskList[action.payload.indexTask].flagChangeTask;
			return Object.assign({}, state, {
				categoryItemsRedux: categoryItems
			});

		case ADD_TASK_IN_CATEGORY:
			categoryItems[action.payload.indexCategory].taskList.push(action.payload.newTask);
			return Object.assign({}, state, {
				categoryItemsRedux: categoryItems
			});

		case HIDE_TASKS_COMPLETED_INPUT_SEARCH:
			categoryItems.forEach((item) => {
				item.taskList.forEach((item) => {
					item.show = action.payload.flagShow;
				})
			});
			return Object.assign({}, state, {
				categoryItemsRedux: categoryItems
			});

		case SHOW_TASKS:
			categoryItems[action.payload.indexCategory].taskList[action.payload.indexTask].show = action.payload.flagShow;
			return Object.assign({}, state, {
				categoryItemsRedux: categoryItems
			});

		case HANDLE_MODAL_CLOSE:
			return Object.assign({}, state, {
				showModalRedux: action.payload.showModal
			});

		case HANDLE_MODAL_SHOW:
			return Object.assign({}, state, {
				showModalRedux: true,
				indexModalCategoryRedux: action.payload.indexCategory,
				taskModalSelectedRedux: action.payload.indexCategory,
				indexModalTaskRedux: action.payload.indexTask,
				textModalTaskRedux: categoryItems[action.payload.indexCategory].taskList[action.payload.indexTask].taskText,
				isDoneModalRedux: categoryItems[action.payload.indexCategory].taskList[action.payload.indexTask].flagChangeTask,
				taskInfoRedux: {
					task: categoryItems[action.payload.indexCategory].taskList[action.payload.indexTask],
					indexCategoryTask: action.payload.indexCategory,
					indexTask: action.payload.indexTask
				}
			});

		case SAVE_MODAL_INFO:
			categoryItems[state.indexModalCategoryRedux].taskList[state.taskInfoRedux.indexTask].taskText = action.payload.modalText;
			categoryItems[state.indexModalCategoryRedux].taskList[state.taskInfoRedux.indexTask].flagChangeTask = action.payload.modalChecked;

			if (state.indexModalCategoryRedux != state.taskModalSelectedRedux) {
				categoryItems[state.taskModalSelectedRedux].taskList.push(state.taskInfoRedux.task);
				categoryItems[state.taskInfoRedux.indexCategoryTask].taskList.splice(state.taskInfoRedux.indexTask, 1);
			}

			return Object.assign({}, state, {
				showModalRedux: false,
				categoryItemsRedux: categoryItems
			});

		case CHANGE_TEXT_MODAL_TASK:
			return Object.assign({}, state, {
				textModalTaskRedux: action.payload.textModalTask
			});

		case CHANGE_CHECKBOX_DONE_MODAL:
			return Object.assign({}, state, {
				isDoneModalRedux: !state.isDoneModalRedux
			});

		case CHANGE_VALUE_SELECT_MODAL:
			let taskModalSelected = state.taskModalSelectedRedux;
			categoryItems.forEach((item, index) => {
				if (index == action.payload.eventValue) {
					taskModalSelected = index;
				}
			});
			return Object.assign({}, state, {
				taskModalSelectedRedux: taskModalSelected
			});

		default: return state;
	}
};

export default categoryTitle;
import { CHANGE_INPUT_VALUE_CATEGORY_TITLE, ADD_CATEGORY_ITEM, DELETE_CATEGORY_ITEM, CHANGE_CATEGORY_TEXT, SUBMIT_CATEGORY_INPUT, CHANGE_INPUT_CATEGORY_ITEM, ADD_SUBCATEGORY_ITEM, GENERATION_LEVEL_CATEGORY, FILTER_CATEGORY_ITEMS, CHANGE_CHECKED_CATEGORY, CHANGE_DISABLED_TASK_INPUTS, HANDLE_CHECKED_TASK, ADD_TASK_IN_CATEGORY, HIDE_TASKS_COMPLETED_INPUT_SEARCH, SHOW_TASKS, HANDLE_MODAL_CLOSE, HANDLE_MODAL_SHOW, SAVE_MODAL_INFO, CHANGE_TEXT_MODAL_TASK, CHANGE_CHECKBOX_DONE_MODAL, CHANGE_VALUE_SELECT_MODAL } from '../constants/index.js';

export const handleChangeInputRedux = (newInputValue) => {
	return {
		type: CHANGE_INPUT_VALUE_CATEGORY_TITLE,
		payload: {
			inputValueRedux: newInputValue
		}
	};
};

export const addCategoryItemRedux = (newCategoryItem) => {
	return {
		type: ADD_CATEGORY_ITEM,
		payload: {
			categoryItemsRedux: newCategoryItem
		}
	}
}

export const deleteCategoryItemRedux = (indexCategory, indicesLength) => {
	return {
		type: DELETE_CATEGORY_ITEM,
		payload: {
			indexCategory: indexCategory,
			indicesLength: indicesLength
		}
	}
}

export const changeCategoryTextRedux = (indexCategory) => {
	return {
		type: CHANGE_CATEGORY_TEXT,
		payload: {
			indexCategory: indexCategory
		}
	}
}

export const submitCategoryInputRedux = (indexCategory, elementValue) => {
	return {
		type: SUBMIT_CATEGORY_INPUT,
		payload: {
			indexCategory: indexCategory,
			elementValue: elementValue
		}
	}
}

export const changeInputCategoryItemRedux = (indexCategory, elementValue) => {
	return {
		type: CHANGE_INPUT_CATEGORY_ITEM,
		payload: {
			indexCategory: indexCategory, 
			elementValue: elementValue
		}
	}
}

export const addSubCategoryItemRedux = (indexCategory, newSubCategoryItem) => {
	return {
		type: ADD_SUBCATEGORY_ITEM,
		payload: {
			indexCategory: indexCategory,
			newSubCategoryItem: newSubCategoryItem
		}
	}
}

export const generationLevelCategoryRedux = (categoryItemsRedux) => {
	return {
		type: GENERATION_LEVEL_CATEGORY,
		payload: {
			categoryItemsRedux: categoryItemsRedux
		}
	}
}

export const filterCategoryItemsRedux = (categoryItemsRedux) => {
	return {
		type: FILTER_CATEGORY_ITEMS,
		payload: {
			categoryItemsRedux: categoryItemsRedux
		}
	}
}

export const changeCheckedCategoryRedux = (indexCategory) => {
	return {
		type: CHANGE_CHECKED_CATEGORY,
		payload: {
			indexCategory: indexCategory
		}
	}
}

export const changeDisabledTaskInputs = (attributeDisabled) => {
	return {
		type: CHANGE_DISABLED_TASK_INPUTS,
		payload: {
			attributeDisabled: attributeDisabled
		}
	}
}

export const handleCheckedTaskRedux = (indexTask, indexCategory) => {
	return {
		type: HANDLE_CHECKED_TASK,
		payload: {
			indexTask: indexTask, 
			indexCategory: indexCategory
		}
	}
}

export const addTaskInCategoryRedux = (newTask, indexCategory) => {
	return {
		type: ADD_TASK_IN_CATEGORY,
		payload: {
			newTask: newTask,
			indexCategory: indexCategory
		}
	}
}

export const hideTasksCompletedInputSearch = (flagShow) => {
	return {
		type: HIDE_TASKS_COMPLETED_INPUT_SEARCH,
		payload: {
			flagShow: flagShow
		}
	}
}

export const showTasksRedux = (flagShow, indexCategory, indexTask) => {
	return {
		type: SHOW_TASKS,
		payload: {
			flagShow: flagShow,
			indexCategory: indexCategory,
			indexTask: indexTask
		}
	}
}

export const handleModalCloseRedux = () => {
	return {
		type: HANDLE_MODAL_CLOSE,
		payload: {
			showModal: false
		}
	}
}

export const handleModalShowRedux = (indexCategory, indexTask) => {
	return {
		type: HANDLE_MODAL_SHOW,
		payload: {
			indexCategory: indexCategory,
			indexTask: indexTask
		}
	}
}

export const saveModalInfoRedux = (modalText, modalChecked) => {
	return {
		type: SAVE_MODAL_INFO,
		payload: {
			modalText: modalText,
			modalChecked: modalChecked
		}
	}
}

export const changeTextModalTaskRedux = (textModalTask) => {
	return {
		type: CHANGE_TEXT_MODAL_TASK,
		payload: {
			textModalTask: textModalTask
		}
	}
}

export const changeCheckboxDoneModalRedux = () => {
	return {
		type: CHANGE_CHECKBOX_DONE_MODAL
	}
}

export const changeValueSelectModalRedux = (indexCategory, indexTask, eventValue) => {
	return {
		type: CHANGE_VALUE_SELECT_MODAL,
		payload: {
			indexCategory: indexCategory, 
			indexTask: indexTask,
			eventValue: eventValue
		} 
	}
}
import { CHANGE_INPUT_VALUE_CATEGORY_TITLE, ADD_CATEGORY_ITEM, DELETE_CATEGORY_ITEM, CHANGE_CATEGORY_TEXT, SUBMIT_CATEGORY_INPUT, CHANGE_INPUT_CATEGORY_ITEM, ADD_SUBCATEGORY_ITEM, GENERATION_LEVEL_CATEGORY } from '../constants/index.js';

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
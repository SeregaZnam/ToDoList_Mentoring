import { CHANGE_INPUT_VALUE_CATEGORY_TITLE, ADD_CATEGORY_ITEM, DELETE_CATEGORY_ITEM, CHANGE_CATEGORY_TEXT, SUBMIT_CATEGORY_INPUT, CHANGE_INPUT_CATEGORY_ITEM, ADD_SUBCATEGORY_ITEM, GENERATION_LEVEL_CATEGORY, CHANGE_CHECKED_CATEGORY } from '../constants/index.js';
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

		default: return state;
	}
};

export default categoryTitle;
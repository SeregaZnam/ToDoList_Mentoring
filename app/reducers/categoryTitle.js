import { CHANGE_INPUT_VALUE_CATEGORY_TITLE } from '../constants/index.js';

const initialState = {
	inputValue: ''
};

const categoryTitle = (state = initialState, action) => {
	console.log('reducers');
	switch (action.type) {
		case CHANGE_INPUT_VALUE_CATEGORY_TITLE: 
			console.log('CHANGE_INPUT_VALUE_CATEGORY_TITLE');
			return Object.assign({}, state, { inputValue: action.payload });
		default: return state;
	}

};

export default categoryTitle;
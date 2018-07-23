import { CHANGE_INPUT_VALUE_CATEGORY_TITLE } from '../constants/index.js';

export const handleChangeInputRedux = (newInputValue) => {
	return {
		type: CHANGE_INPUT_VALUE_CATEGORY_TITLE,
		payload: newInputValue
	}
};
export const initialState = {
	inputValueRedux: '',
	categoryTextRedux: '',
	showModalRedux: false,
	textModalTaskRedux: null,
	isDoneModalRedux: null,
	indexModalCategoryRedux: null,
	indexModalTaskRedux: null,
	taskModalSelectedRedux: null,
	disabledTaskInputsRedux: true,
	taskInfoRedux: {
		task: null,
		indexCategoryTask: null,
		indexTask: null,
	},
	categoryItemsRedux: [
		{
			id: 1,
			parentId: 0,
			text: 'Category Test 1',
			checkedCategory: false,
			flagChangeText: false,
			// levelCategory: [1],
			taskList: [
				{taskText: 'To do item 1 1', flagChangeTask: true, show: true},
				{taskText: 'To do item 1 2', flagChangeTask: true, show: true},
				{taskText: 'To do item 1 3', flagChangeTask: false, show: true}
			]
		}
	]
};
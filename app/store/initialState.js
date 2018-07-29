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
			id: 2,
			parentId: 1,
			text: 'Category Test 1 1',
			checkedCategory: false,
			flagChangeText: false,
			taskList: [
				{taskText: 'To do item 1 1 1', flagChangeTask: true, show: true},
				{taskText: 'To do item 1 1 2', flagChangeTask: true, show: true},
				{taskText: 'To do item 1 1 3', flagChangeTask: false, show: true}
			]
		},
		{
			id: 1,
			parentId: 0,
			text: 'Category Test 1',
			checkedCategory: false,
			flagChangeText: false,
			taskList: [
				{taskText: 'To do item 1 1', flagChangeTask: true, show: true},
				{taskText: 'To do item 1 2', flagChangeTask: true, show: true},
				{taskText: 'To do item 1 3', flagChangeTask: false, show: true}
			]
		},
		{
			id: 4,
			parentId: 1,
			text: 'Category Test 1 2',
			checkedCategory: false,
			flagChangeText: false,
			taskList: [
				{taskText: 'To do item 1 2 1', flagChangeTask: true, show: true},
				{taskText: 'To do item 1 2 2', flagChangeTask: true, show: true},
				{taskText: 'To do item 1 2 3', flagChangeTask: false, show: true}
			]
		},
		{
			id: 6,
			parentId: 0,
			text: 'Category Test 3',
			checkedCategory: false,
			flagChangeText: false,
			taskList: [
				{taskText: 'To do item 3 1', flagChangeTask: true, show: true},
				{taskText: 'To do item 3 2', flagChangeTask: true, show: true},
				{taskText: 'To do item 3 3', flagChangeTask: false, show: true}
			]
		},
		{
			id: 5,
			parentId: 0,
			text: 'Category Test 2',
			checkedCategory: false,
			flagChangeText: false,
			taskList: [
				{taskText: 'To do item 2 1', flagChangeTask: true, show: true},
				{taskText: 'To do item 2 2', flagChangeTask: true, show: true},
				{taskText: 'To do item 2 3', flagChangeTask: false, show: true}
			]
		}
	]
};
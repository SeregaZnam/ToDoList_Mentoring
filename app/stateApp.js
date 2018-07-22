const State = {
	inputValue: '',
	showModal: false,
	textModalTask: null,
	isDoneModal: null,
	indexModalCategory: null,
	indexModalTask: null,
	taskModalSelected: null,
	disabledTaskInputs: true,
	taskInfo: {
		task: null,
		indexCategoryTask: null,
		indexTask: null,
	},
	categoryItems: [
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
		},
		{
			id: 2,
			parentId: 1,
			text: 'Category Test 1 1',
			checkedCategory: false,
			flagChangeText: false,
			// levelCategory: [1,1],
			taskList: [
				{taskText: 'To do item 1 1 1', flagChangeTask: true, show: true},
				{taskText: 'To do item 1 1 2', flagChangeTask: true, show: true},
				{taskText: 'To do item 1 1 3', flagChangeTask: false, show: true}
			]
		},
		{
			id: 4,
			parentId: 1,
			text: 'Category Test 1 2',
			checkedCategory: false,
			flagChangeText: false,
			// levelCategory: [1,2],
			taskList: [
				{taskText: 'To do item 1 2 1', flagChangeTask: true, show: true},
				{taskText: 'To do item 1 2 2', flagChangeTask: true, show: true},
				{taskText: 'To do item 1 2 3', flagChangeTask: false, show: true}
			]
		},
		{
			id: 5,
			parentId: 0,
			text: 'Category Test 2',
			checkedCategory: false,
			flagChangeText: false,
			// levelCategory: [2],
			taskList: [
				{taskText: 'To do item 2 1', flagChangeTask: true, show: true},
				{taskText: 'To do item 2 2', flagChangeTask: true, show: true},
				{taskText: 'To do item 2 3', flagChangeTask: false, show: true}
			]
		},
		{
			id: 6,
			parentId: 0,
			text: 'Category Test 3',
			checkedCategory: false,
			flagChangeText: false,
			// levelCategory: [3],
			taskList: [
				{taskText: 'To do item 3 1', flagChangeTask: true, show: true},
				{taskText: 'To do item 3 2', flagChangeTask: true, show: true},
				{taskText: 'To do item 3 3', flagChangeTask: false, show: true}
			]
		}
	]
}

export default State;
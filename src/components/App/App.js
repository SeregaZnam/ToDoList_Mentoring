import React, { Component } from 'react';
import CategoryArea from '../CategoryArea/CategoryArea';
import TasksArea from '../TasksArea/TasksArea';
import ModalWindow from '../ModalWindow/ModalWindow';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		// textModalTask, isDoneModal, indexModalCategory and indexModalTask are created to save data in the modal window
		this.state = {
			inputValue: '',
			showModal: false,
			textModalTask: null,
			isDoneModal: null,
			indexModalCategory: null,
			indexModalTask: null,
			categoryItems: [
				{
					text: 'Category Test 1',
					checkedCategory: false,
					flagChangeText: false,
					levelCategory: [1],
					taskList: [
						{taskText: 'To do test', flagChangeTask: true, show: true},
						{taskText: 'To do test2', flagChangeTask: true, show: true},
						{taskText: 'To do test3', flagChangeTask: false, show: true}
					],
					subCategoryItems: [
						{text: 'subcategory test', checkedSubCategory: false, flagChangeTextSubCategory: true},
						{text: 'subcategory test 2', checkedSubCategory: false, flagChangeTextSubCategory: false},
						{text: 'subcategory test 3', checkedSubCategory: false, flagChangeTextSubCategory: false}
					]
				},
				{
					text: 'Category Test 2',
					checkedCategory: false,
					flagChangeText: false,
					levelCategory: [2],
					taskList: [
						{taskText: 'To do test', flagChangeTask: true, show: true},
						{taskText: 'To do test2', flagChangeTask: true, show: true},
						{taskText: 'To do test3', flagChangeTask: false, show: true}
					]
				},
				{
					text: 'Category Test 3 1',
					checkedCategory: false,
					flagChangeText: false,
					levelCategory: [3, 1],
					taskList: [
						{taskText: 'To do test', flagChangeTask: true, show: true},
						{taskText: 'To do test2', flagChangeTask: true, show: true},
						{taskText: 'To do test3', flagChangeTask: false, show: true}
					]
				}
			]
		}
	}

	// Change state when entering a value in the input
	handleChangeInput(event) {
		this.setState({ inputValue: event.target.value });
	}

	// Adding a category from the component AddCategoryTitle
	addCategory(event) {
		let maxLevelCategory;
		
		event.preventDefault();
		maxLevelCategory = this.state.categoryItems.map((item) => {
			return item.levelCategory[0];
		});
		maxLevelCategory = Math.max(...maxLevelCategory) + 1;

		this.state.categoryItems.push({ 
			text: this.state.inputValue, 
			checkedCategory: false,
			flagChangeText: false,
			levelCategory: [maxLevelCategory],
			taskList: []
		});
		this.setState({
			inputValue: '',
			categoryItems: this.state.categoryItems
		});
	}

	// Deleting category item
	deleteCategoryItem(index) {
		this.state.categoryItems.splice(index, 1);
		this.setState({ categoryItems: this.state.categoryItems });
	}

	// Change category text
	changeCategoryText(index) {
		this.state.categoryItems[index].flagChangeText = !this.state.categoryItems[index].flagChangeText;
		this.setState({ categoryItems: this.state.categoryItems });
	}

	// Change category text when submiting
	submitCategoryInput(event) {
		let index = event.target.children[0].dataset.index;

		event.preventDefault();
		this.state.categoryItems[index].text = event.target.children[0].value;
		this.state.categoryItems[index].flagChangeText = !this.state.categoryItems[index].flagChangeText;
		this.setState({ categoryItems: this.state.categoryItems });
	}

	// Changing text in a state when typing
	changeInputCategoryItem(event) {
		let index = event.target.dataset.index;

		this.state.categoryItems[index].text = event.target.value;
		this.setState({ categoryItems: this.state.categoryItems });
	}

	// Show and hide tasks when clicking on a category
	toggleShowTasks(index) {
		this.state.categoryItems[index].checkedCategory = !this.state.categoryItems[index].checkedCategory;
		this.setState({ categoryItems: this.state.categoryItems })
	}

	// Change checked checkbox task 
	handleCheckedTask(event) {
		let indexTask = event.target.dataset.index,
			indexCategory = event.target.dataset.category;

		this.state.categoryItems[indexCategory].taskList[indexTask].flagChangeTask = !this.state.categoryItems[indexCategory].taskList[indexTask].flagChangeTask;
		this.setState({ categoryItems: this.state.categoryItems });
	}

	// Add a task to the category
	addTaskInCategory(event) {
		let valueInput = event.target.getElementsByClassName('form-control')[0];

		event.preventDefault();
		this.state.categoryItems.forEach((item) => {
			if (item.checkedCategory) {
				item.taskList.push({
					taskText: valueInput.value, 
					flagChangeTask: false, 
					show: true
				});
				return;
			}
		})
		this.setState({ categoryItems: this.state.categoryItems });
		valueInput.value = '';
	}

	// Search Task
	searchTaskInput(event) {
		// Hide tasks with a completed input search
		if (event.target.value) {
			this.state.categoryItems.forEach((item) => {
				item.taskList.forEach((item) => {
					item.show = false;
				})
			});
			this.setState({ categoryItems: this.state.categoryItems });
		} else {
			this.state.categoryItems.forEach((item) => {
				item.taskList.forEach((item) => {
					item.show = true;
				})
			});
			this.setState({ categoryItems: this.state.categoryItems });
		}

		// Show test a searchable match
		this.state.categoryItems.forEach((item, indexCategory) => {
			if (item.checkedCategory) {
				item.taskList.forEach((elem, indexTask) => {
					if (elem.taskText.toLowerCase().indexOf(event.target.value) >= 0) {
						elem.show = true;
					}
				})
			}
		})
		this.setState({ categoryItems: this.state.categoryItems });
	}

	// Show done tasks
	showDoneTasks(event) {
		if (event.target.checked) {
			this.state.categoryItems.forEach((item) => {
				item.taskList.forEach((item) => {
					if (item.flagChangeTask) {
						item.show = true;
					} else {
						item.show = false;
					}
				})
			});
		} else {
			this.state.categoryItems.forEach((item) => {
				item.taskList.forEach((item) => {
					item.show = true;
				})
			});
		}
		this.setState({ categoryItems: this.state.categoryItems });
	}

	/*******************/
	/* Modal functions */
	/*******************/

	handleModalClose() {
		this.setState({ showModal: false });
	}

	handleModalShow(event) {
		let eventElement = event.target.previousElementSibling.previousElementSibling,
			indexCategory = eventElement.dataset.category,
			indexTask = eventElement.dataset.index;

		this.state.indexModalCategory = indexCategory;
		this.state.indexTask = indexTask;

		this.setState({ 
			indexModalCategory: this.state.indexModalCategory,
			indexModalTask: this.state.indexTask,
			textModalTask: this.state.categoryItems[indexCategory].taskList[indexTask].taskText,
			isDoneModal: this.state.categoryItems[indexCategory].taskList[indexTask].flagChangeTask
		});
	
		this.setState({ showModal: true });
	}

	saveModalInfo(modalText, modalChecked) {
		let indexCategory = this.state.indexModalCategory,
			indexTask    = this.state.indexTask;

		this.state.categoryItems[indexCategory].taskList[indexTask].taskText = modalText;
		this.state.categoryItems[indexCategory].taskList[indexTask].flagChangeTask = modalChecked;

		this.setState({ 
			showModal: false,
			categoryItems: this.state.categoryItems
		});
	}

	changeTextModalTask(event) {
		this.setState({ textModalTask: event.target.value });
	}

	changeCheckboxDoneModal() {
		this.setState({ isDoneModal: !this.state.isDoneModal });
	}

	/************************/
	/* SubCategory function */
	/************************/

	addSubCategoryItem(levelCategory) {
		let lengthNextLevel = levelCategory.length + 1,
			lastNumberLevel = 0,
			newNumberLevel = [];

		this.state.categoryItems.forEach((item) => {
			if (item.levelCategory.length == lengthNextLevel && levelCategory != item.levelCategory) {
				lastNumberLevel < item.levelCategory[item.levelCategory.length - 1] ?
					lastNumberLevel = item.levelCategory[item.levelCategory.length - 1] : 
					lastNumberLevel;
			}
		});

		for (var i = 0; i < levelCategory.length; i++) {
			newNumberLevel.push(levelCategory[i]);
		}

		lastNumberLevel++;
		newNumberLevel.push(lastNumberLevel);

		this.state.categoryItems.push({
			text: '',
			checkedCategory: false,
			flagChangeText: true,
			levelCategory: newNumberLevel,
			taskList: []
		});

		this.setState({ categoryItems: this.state.categoryItems });
	}

	changeInputSubCategoryItem(event) {
		let categoryIndex    = event.target.dataset.categoryindex,
			subCategoryIndex = event.target.dataset.subindex;

		this.state.categoryItems[categoryIndex].subCategoryItems[subCategoryIndex].text = event.target.value;
		this.setState({ categoryItems: this.state.categoryItems });
	}

	submitSubCategoryInput(event) {
		let categoryIndex    = event.target.children[0].dataset.categoryindex,
			subCategoryIndex = event.target.children[0].dataset.subindex;

		this.state.categoryItems[categoryIndex].subCategoryItems[subCategoryIndex].text = event.target.children[0].value;
		this.state.categoryItems[categoryIndex].subCategoryItems[subCategoryIndex].flagChangeTextSubCategory = !this.state.categoryItems[categoryIndex].subCategoryItems[subCategoryIndex].flagChangeTextSubCategory;
		this.setState({ categoryItems: this.state.categoryItems });
	}

	toggleShowSubTasks(indexCategory, indexSubCategory) {
		this.state.categoryItems[indexCategory].subCategoryItems[indexSubCategory].checkedSubCategory = !this.state.categoryItems[indexCategory].subCategoryItems[indexSubCategory].checkedSubCategory;
		this.setState({ categoryItems: this.state.categoryItems })
	}

	changeSubCategoryText(indexCategory, indexSubCategory) {
		this.state.categoryItems[indexCategory].subCategoryItems[indexSubCategory].flagChangeTextSubCategory = !this.state.categoryItems[indexCategory].subCategoryItems[indexSubCategory].flagChangeTextSubCategory;
		this.setState({ categoryItems: this.state.categoryItems });
	}

	deleteSubCategoryItem(indexCategory, indexSubCategory) {
		this.state.categoryItems[indexCategory].subCategoryItems.splice(indexSubCategory, 1);
		this.setState({ categoryItems: this.state.categoryItems });
	}

  render() {
    return (
    	<div className="app-main">
      		<CategoryArea 
      			categoryItems={this.state.categoryItems} 
      			inputValue={this.state.inputValue}
      			addCategory={this.addCategory.bind(this)}
    			handleChangeInput={this.handleChangeInput.bind(this)}
    			deleteCategoryItem={this.deleteCategoryItem.bind(this)}
    			changeCategoryText={this.changeCategoryText.bind(this)}
    			toggleShowTasks={this.toggleShowTasks.bind(this)}
    			submitCategoryInput={this.submitCategoryInput.bind(this)}
    			changeInputCategoryItem={this.changeInputCategoryItem.bind(this)}
    			addSubCategoryItem={this.addSubCategoryItem.bind(this)}
    			changeInputSubCategoryItem={this.changeInputSubCategoryItem.bind(this)}
    			submitSubCategoryInput={this.submitSubCategoryInput.bind(this)}
    			toggleShowSubTasks={this.toggleShowSubTasks.bind(this)}
    			changeSubCategoryText={this.changeSubCategoryText.bind(this)}
    			deleteSubCategoryItem={this.deleteSubCategoryItem.bind(this)}
      		/>
      		<TasksArea 
      			categoryItems={this.state.categoryItems}
      			handleCheckedTask={this.handleCheckedTask.bind(this)}
      			addTaskInCategory={this.addTaskInCategory.bind(this)}
      			searchTaskInput={this.searchTaskInput.bind(this)}
      			showDoneTasks={this.showDoneTasks.bind(this)}
      			handleModalShow={this.handleModalShow.bind(this)}
      		/>
      		<ModalWindow 
      			showModal={this.state.showModal}
      			textModalTask={this.state.textModalTask}
      			isDoneModal={this.state.isDoneModal}
      			handleModalClose={this.handleModalClose.bind(this)}
      			saveModalInfo={this.saveModalInfo.bind(this)}
      			changeTextModalTask={this.changeTextModalTask.bind(this)}
      			changeCheckboxDoneModal={this.changeCheckboxDoneModal.bind(this)}
      		/>
      	</div>
    );
  }
}

export default App;
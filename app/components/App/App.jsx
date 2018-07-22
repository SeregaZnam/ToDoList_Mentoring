import React, { Component } from 'react';
import CategoryArea from '../CategoryArea/CategoryArea.jsx';
import TasksArea from '../TasksArea/TasksArea.jsx';
import ModalWindow from '../ModalWindow/ModalWindow.jsx';
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
			taskModalSelected: null,
			disabledTaskInputs: true,
			taskInfo: {
				task: null,
				indexCategoryTask: null,
				indexTask: null,
			},
			categoryItems: [
			{
					id: 2,
					parentId: 1,
					text: 'Category Test 1 1',
					checkedCategory: false,
					flagChangeText: false,
					levelCategory: [1,1,1],
					taskList: [
						{taskText: 'To do item 1 1 1', flagChangeTask: true, show: true},
						{taskText: 'To do item 1 1 2', flagChangeTask: true, show: true},
						{taskText: 'To do item 1 1 3', flagChangeTask: false, show: true}
					]
				},
				{
					id: 3,
					parentId: 1,
					text: 'Category Test 1 2',
					checkedCategory: false,
					flagChangeText: false,
					levelCategory: [1,2],
					taskList: [
						{taskText: 'To do item 1 2 1', flagChangeTask: true, show: true},
						{taskText: 'To do item 1 2 2', flagChangeTask: true, show: true},
						{taskText: 'To do item 1 2 3', flagChangeTask: false, show: true}
					]
				},
				{
					id: 1,
					parentId: 0,
					text: 'Category Test 1',
					checkedCategory: false,
					flagChangeText: false,
					levelCategory: [1],
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
					levelCategory: [1,1],
					taskList: [
						{taskText: 'To do item 1 1 1', flagChangeTask: true, show: true},
						{taskText: 'To do item 1 1 2', flagChangeTask: true, show: true},
						{taskText: 'To do item 1 1 3', flagChangeTask: false, show: true}
					]
				},
				{
					id: 4,
					parentId: 0,
					text: 'Category Test 2',
					checkedCategory: false,
					flagChangeText: false,
					levelCategory: [2],
					taskList: [
						{taskText: 'To do item 2 1', flagChangeTask: true, show: true},
						{taskText: 'To do item 2 2', flagChangeTask: true, show: true},
						{taskText: 'To do item 2 3', flagChangeTask: false, show: true}
					]
				},
				{
					id: 5,
					parentId: 0,
					text: 'Category Test 3',
					checkedCategory: false,
					flagChangeText: false,
					levelCategory: [3],
					taskList: [
						{taskText: 'To do item 3 1', flagChangeTask: true, show: true},
						{taskText: 'To do item 3 2', flagChangeTask: true, show: true},
						{taskText: 'To do item 3 3', flagChangeTask: false, show: true}
					]
				}
			]
		}
		this.filterCategoryItems();
	}

	filterCategoryItems() {
		let maxLength = 0,
			filterCategoryArray = [],
			filterCategoryItems = [];

		filterCategoryArray = this.state.categoryItems.slice();

		filterCategoryArray = filterCategoryArray.map(item => {
			if (item.levelCategory.length > maxLength) { 
				maxLength = item.levelCategory.length;
			}
			return item.levelCategory;
		});
		
		filterCategoryArray = filterCategoryArray.map(item => {
			for (let i = 0; i < maxLength; i++) {
				if (item[i] == undefined) item[i] = 0;
			}
			return item.join('');
		});

		filterCategoryArray = filterCategoryArray.sort((a, b) => a - b);

		filterCategoryArray = filterCategoryArray.map(item => {
			item = item.split('');
			return item;
		});

		filterCategoryArray.forEach(item => {
			this.state.categoryItems.forEach(elem => {
				if (elem.levelCategory.toString() == item.toString()) {
					filterCategoryItems.push(elem);
				}
			});
		});

		this.state.categoryItems = filterCategoryItems;
	}

	// Change state when entering a value in the input
	handleChangeInput(event) {
		this.setState({ inputValue: event.target.value });
	}

	// Adding a category from the component AddCategoryTitle
	addCategory(event) {
		let maxLevelCategory,
			formControl		   = event.target,
			inputSearch        = formControl.querySelector('input');

		event.preventDefault();

		if (inputSearch.value) {
			inputSearch.style.backgroundColor = 'white';

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
		} else {
			formControl.classList.add('error');

			setTimeout(() => {
				formControl.classList.remove('error');
			}, 3000);
		}
	}

	// Deleting category item
	deleteCategoryItem(levelCategory, index) {
		let categoryItems = this.state.categoryItems;
		let indices       = [];

		for (let i = 0; i < categoryItems.length; i++) {
			if (categoryItems[i].levelCategory.join('').indexOf(levelCategory.join('')) == 0) {
				indices.push(i);
			}
		}

		this.state.categoryItems.splice(index, indices.length);
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
		let attributeDisabled;

		this.state.categoryItems[index].checkedCategory = !this.state.categoryItems[index].checkedCategory;
		this.setState({ categoryItems: this.state.categoryItems });

		attributeDisabled = this.state.categoryItems.some((item) => {
			if (item.checkedCategory) { 
				return true;
			} 
			return false;
		})
		
		this.state.disabledTaskInputs = !attributeDisabled;
		this.setState({ disabledTaskInputs: this.state.disabledTaskInputs });
	}

	// Change checked checkbox task 
	handleCheckedTask(event) {
		let indexTask     = event.target.dataset.index,
			indexCategory = event.target.dataset.category;

		this.state.categoryItems[indexCategory].taskList[indexTask].flagChangeTask = !this.state.categoryItems[indexCategory].taskList[indexTask].flagChangeTask;
		this.setState({ categoryItems: this.state.categoryItems });
	}

	// Add a task to the category
	addTaskInCategory(event) {
		let elemEvent			= event.target,
			addTaskInput 	    = elemEvent.querySelector('input'),
			addTaskInputTooltip = elemEvent.querySelector('.tasks-inputs__title__tooltip');

		event.preventDefault();

		if (addTaskInput.value) {
			this.state.categoryItems.forEach((item) => {
				if (item.checkedCategory) {
					item.taskList.push({
						taskText: addTaskInput.value, 
						flagChangeTask: false, 
						show: true
					});
					return;
				}
			})
			this.setState({ categoryItems: this.state.categoryItems });
			addTaskInput.value = '';
		} else {
			elemEvent.classList.add('error');

			setTimeout(() => {
				elemEvent.classList.remove('error');
			}, 3000);
		}
	}

	// Search Task
	searchTaskInput(event) {
		let showDoneCheckbox = document.querySelector('.tasks-inputs__checkbox');

		// Hide tasks with a completed input search
		if (event.target.value) {
			this.state.categoryItems.forEach((item) => {
				item.taskList.forEach((item) => {
					item.show = false;
				})
			});
		} else {
			if (showDoneCheckbox.checked) {
				this.state.categoryItems.forEach((item) => {
					item.taskList.forEach((item) => {
						item.flagChangeTask ? 
							item.show = true :
							item.show = false;
					})
				});
			} else {
				this.state.categoryItems.forEach((item) => {
					item.taskList.forEach((item) => {
						item.show = true;
					})
				});
			}
		}

		// Show test a searchable match
		this.state.categoryItems.forEach((item, indexCategory) => {
			if (item.checkedCategory) {
				if (showDoneCheckbox.checked) {
					item.taskList.forEach((elem, indexTask) => {
						if (elem.taskText.toLowerCase().indexOf(event.target.value) >= 0 && elem.flagChangeTask) {
							elem.show = true;
						}
					})
				} else {
					item.taskList.forEach((elem, indexTask) => {
						if (elem.taskText.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0) {
							elem.show = true;
						}
					})
				}
			}
		})
		this.setState({ categoryItems: this.state.categoryItems });
	}

	searchInputDelete(event) {
		let showDoneCheckbox = document.querySelector('.tasks-inputs__checkbox');

		event.target.previousElementSibling.value = '';

		if (showDoneCheckbox.checked) {
			this.state.categoryItems.forEach((item) => {
				item.taskList.forEach((item) => {
					if (item.flagChangeTask) {
						item.show = true;
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

	// Show done tasks
	showDoneTasks(event) {
		let inputSearch = document.querySelector('.tasks-inputs__search input');

		if (event.target.checked) {
			this.state.categoryItems.forEach((item) => {
				if (inputSearch.value) {
					item.taskList.forEach((item) => {
						item.flagChangeTask && item.show ? 
							item.show = true : 
							item.show = false;
					})	
				} else {
					item.taskList.forEach((item) => {
						item.flagChangeTask ?
							item.show = true :
							item.show = false;
					})
				}
			});
		} else {
			if (inputSearch.value) {
				this.state.categoryItems.forEach((item) => {
					item.taskList.forEach((item) => {
						if (item.taskText.toLowerCase().indexOf(inputSearch.value.toLowerCase()) >= 0) {
							item.show = true;
						}
					})
				})
			} else {
				this.state.categoryItems.forEach((item) => {
					item.taskList.forEach((item) => {
						item.show = true;
					})
				});
			}
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
		let eventElement  = event.target.previousElementSibling.previousElementSibling,
			indexCategory = eventElement.dataset.category,
			indexTask     = eventElement.dataset.index;

		this.state.indexModalCategory = indexCategory;
		this.state.indexTask 	      = indexTask;
		this.state.taskModalSelected  = indexCategory;
		this.state.taskInfo = {
			task: this.state.categoryItems[indexCategory].taskList[indexTask],
			indexCategoryTask: indexCategory,
			indexTask: indexTask
		};

		this.setState({ 
			indexModalCategory: this.state.indexModalCategory,
			indexModalTask: this.state.indexTask,
			textModalTask: this.state.categoryItems[indexCategory].taskList[indexTask].taskText,
			isDoneModal: this.state.categoryItems[indexCategory].taskList[indexTask].flagChangeTask,
			taskModalSelected: this.state.taskModalSelected,
			taskInfo: this.state.taskInfo
		});
	
		this.setState({ showModal: true });
	}

	saveModalInfo(modalText, modalChecked) {
		let indexCategory 		  = this.state.indexModalCategory,
			indexTask     		  = this.state.indexTask,
			indexModalCategory 	  = this.state.indexModalCategory,
			indexModalTask 		  = this.state.indexModalTask,
			taskInfoIndexCategory = this.state.taskInfo.indexCategoryTask,
			taskInfoIndexTask     = this.state.taskInfo.indexTask,
			taskModalSelected 	  = this.state.taskModalSelected;

		this.state.categoryItems[indexCategory].taskList[indexTask].taskText = modalText;
		this.state.categoryItems[indexCategory].taskList[indexTask].flagChangeTask = modalChecked;

		// If the select was changed
		if (indexCategory != taskModalSelected) {
			this.state.categoryItems[taskModalSelected].taskList.push(this.state.taskInfo.task);
			this.state.categoryItems[taskInfoIndexCategory].taskList.splice(taskInfoIndexTask, 1);
		}

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

	changeValueSelectModal(event) {
		let indexCategory = event.target.dataset.indexcategory,
			indexTask 	  = event.target.dataset.indextask;

		this.state.taskModalSelected = this.state.categoryItems.length;

		this.state.categoryItems.forEach((item, index) => {
			if (index == event.target.value) {
				this.state.taskModalSelected = index;
				this.setState({ taskModalSelected: this.state.taskModalSelected });
			}
		});
	}

	/************************/
	/* SubCategory function */
	/************************/

	addSubCategoryItem(levelCategory, index) {
		let lengthNextLevel = levelCategory.length + 1,
			lastNumberLevel = 0,
			newNumberLevel  = [];

		// Generation of a level number
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

		// Sorting category
		for (let j = 0; j < this.state.categoryItems.length; j++) {
			if (this.state.categoryItems[j].levelCategory.join('').indexOf(levelCategory.join('')) == 0 && 
				levelCategory != this.state.categoryItems[j].levelCategory
			) {
				index = j;
			}
		}

		this.state.categoryItems.splice(index + 1, 0, {
			text: '',
			checkedCategory: false,
			flagChangeText: true,
			levelCategory: newNumberLevel,
			taskList: []
		});

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
      		/>
      		<TasksArea 
      			categoryItems={this.state.categoryItems}
      			disabledTaskInputs={this.state.disabledTaskInputs}
      			handleCheckedTask={this.handleCheckedTask.bind(this)}
      			addTaskInCategory={this.addTaskInCategory.bind(this)}
      			searchTaskInput={this.searchTaskInput.bind(this)}
      			showDoneTasks={this.showDoneTasks.bind(this)}
      			handleModalShow={this.handleModalShow.bind(this)}
      			searchInputDelete={this.searchInputDelete.bind(this)}
      			filterCategoryItems={this.filterCategoryItems.bind(this)}
      		/>
      		<ModalWindow 
      			categoryItems={this.state.categoryItems}
      			showModal={this.state.showModal}
      			textModalTask={this.state.textModalTask}
      			isDoneModal={this.state.isDoneModal}
      			indexModalCategory={this.state.indexModalCategory}
      			indexModalTask={this.state.indexModalTask}
      			taskModalSelected={this.state.taskModalSelected}
      			handleModalClose={this.handleModalClose.bind(this)}
      			saveModalInfo={this.saveModalInfo.bind(this)}
      			changeTextModalTask={this.changeTextModalTask.bind(this)}
      			changeCheckboxDoneModal={this.changeCheckboxDoneModal.bind(this)}
      			changeValueSelectModal={this.changeValueSelectModal.bind(this)}
      		/>
      	</div>
    );
  }
}

export default App;
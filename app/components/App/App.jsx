import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleChangeInputRedux, addCategoryItemRedux, deleteCategoryItemRedux, addSubCategoryItemRedux, generationLevelCategoryRedux, filterCategoryItemsRedux, changeCheckedCategoryRedux, changeDisabledTaskInputs, addTaskInCategoryRedux, hideTasksCompletedInputSearch, showTasksRedux } from '../../actions/index';
import CategoryArea from '../CategoryArea/CategoryArea.jsx';
import TasksArea from '../TasksArea/TasksArea.jsx';
import ModalWindow from '../ModalWindow/ModalWindow.jsx';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.addCategory 		= this.addCategory.bind(this);
		this.deleteCategoryItem = this.deleteCategoryItem.bind(this);
		this.toggleShowTasks 	= this.toggleShowTasks.bind(this);
		this.addSubCategoryItem = this.addSubCategoryItem.bind(this);
		this.addTaskInCategory  = this.addTaskInCategory.bind(this);
		this.searchTaskInput    = this.searchTaskInput.bind(this);
		this.showDoneTasks 		= this.showDoneTasks.bind(this);
		this.searchInputDelete  = this.searchInputDelete.bind(this);

		this.generationLevelCategory();
		this.filterCategoryItems();
	}

	generationLevelCategory() {
		const { categoryItemsRedux, generationLevelCategoryRedux } = this.props;
		let i = 1,
			filterCategoryItems = [],
			newCategoryItems = [];

		categoryItemsRedux.forEach(item => {
			item.levelCategory = [];
		})

		filterCategoryItems = categoryItemsRedux.slice();

		filterCategoryItems = categoryItemsRedux.map(item => {
			return item.id;
		})

		filterCategoryItems = filterCategoryItems.sort((a, b) => a - b);

		filterCategoryItems.forEach(item => {
			categoryItemsRedux.forEach(categoryItem => {
				if (item == categoryItem.id) {
					newCategoryItems.push(categoryItem);
				}
			})
		})

		newCategoryItems.forEach(item => {
			if (item.parentId == 0) {
				item.levelCategory.push(i);
				i++;
				pushLevelCategory(item.id, categoryItemsRedux, item.levelCategory);
			}
		})

		generationLevelCategoryRedux(categoryItemsRedux);

		function pushLevelCategory(id, categoryItemsRedux, levelCategory) {
			let j = 1;
			categoryItemsRedux.forEach(item => {
				if (id == item.parentId) {
					item.levelCategory = levelCategory.slice();
					item.levelCategory.push(j);
					j++;
					pushLevelCategory(item.id, categoryItemsRedux, item.levelCategory);
				}
			});
		}
	}

	filterCategoryItems() {
		const { categoryItemsRedux, filterCategoryItemsRedux } = this.props;
		let maxLength = 0,
			filterCategoryArray = [],
			filterCategoryItems = [];

		filterCategoryArray = categoryItemsRedux.slice();

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
			categoryItemsRedux.forEach(elem => {
				if (elem.levelCategory.toString() == item.toString()) {
					filterCategoryItems.push(elem);
				}
			});
		});

		filterCategoryItemsRedux(filterCategoryItems);
	}

	// Adding a category from the component AddCategoryTitle
	addCategory(event) {
		const { inputValueRedux, categoryItemsRedux, addCategoryItemRedux } = this.props;
		let maxIdCategory = 0,
			maxLevelCategory,
			formControl		   = event.target,
			inputSearch        = formControl.querySelector('input'),
			newCategoryItem;

		event.preventDefault();

		if (inputSearch.value) {
			inputSearch.style.backgroundColor = 'white';

			maxLevelCategory = categoryItemsRedux.map((item) => {
				if (maxIdCategory < item.id) {
					maxIdCategory = item.id;
				}
				return item.levelCategory[0];
			});
			
			if (maxLevelCategory.length == 0) {
				maxLevelCategory = 1;
			} else {
				maxLevelCategory = Math.max(...maxLevelCategory) + 1;
			}

			newCategoryItem = { 
				id: maxIdCategory + 1,
				parentId: 0,
				text: inputValueRedux, 
				checkedCategory: false,
				flagChangeText: false,
				levelCategory: [maxLevelCategory],
				taskList: []
			};

			addCategoryItemRedux(newCategoryItem); 

		} else {
			formControl.classList.add('error');

			setTimeout(() => {
				formControl.classList.remove('error');
			}, 3000);
		}
	}

	// Deleting category item
	deleteCategoryItem(levelCategory, index) {
		const { categoryItemsRedux, deleteCategoryItemRedux } = this.props;
		let indices = [];

		for (let i = 0; i < categoryItemsRedux.length; i++) {
			if (categoryItemsRedux[i].levelCategory.join('').indexOf(levelCategory.join('')) == 0) {
				indices.push(i);
			}
		}

		deleteCategoryItemRedux(index, indices.length);
	}

	// Show and hide tasks when clicking on a category
	toggleShowTasks(index) {
		const { categoryItemsRedux, changeCheckedCategoryRedux, changeDisabledTaskInputs } = this.props;
		let attributeDisabled;

		changeCheckedCategoryRedux(index);

		attributeDisabled = categoryItemsRedux.some((item) => {
			if (item.checkedCategory) { 
				return true;
			} 
			return false;
		})
		
		changeDisabledTaskInputs(!attributeDisabled);
	}

	// Add a task to the category
	addTaskInCategory(event) {
		const { categoryItemsRedux, addTaskInCategoryRedux } = this.props;
		let elemEvent    = event.target,
			addTaskInput = elemEvent.querySelector('input'),
			newTask;

		event.preventDefault();

		if (addTaskInput.value) {
			categoryItemsRedux.forEach((item, index) => {
				if (item.checkedCategory) {
					newTask = {
						taskText: addTaskInput.value, 
						flagChangeTask: false, 
						show: true
					};
					addTaskInCategoryRedux(newTask, index);
					return;
				}
			})
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
		const { categoryItemsRedux, hideTasksCompletedInputSearch, showTasksRedux } = this.props;
		let showDoneCheckbox = document.querySelector('.tasks-inputs__checkbox'),
			flagShow;

		// Hide tasks with a completed input search
		if (event.target.value) {
			flagShow = false;
			hideTasksCompletedInputSearch(flagShow);
		} else {
			if (showDoneCheckbox.checked) {
				categoryItemsRedux.forEach((item, indexCategory) => {
					item.taskList.forEach((item, indexTask) => {
						if (item.flagChangeTask) {
							flagShow = true;
							showTasksRedux(flagShow, indexCategory, indexTask);
						} else {
							flagShow = false;
							showTasksRedux(flagShow, indexCategory, indexTask);
						}
					})
				});
			} else {
				flagShow = true;
				hideTasksCompletedInputSearch(flagShow);
			}
		}

		// Show task a searchable match
		categoryItemsRedux.forEach((item, indexCategory) => {
			if (item.checkedCategory) {
				if (showDoneCheckbox.checked) {
					item.taskList.forEach((elem, indexTask) => {
						if (elem.taskText.toLowerCase().indexOf(event.target.value) >= 0 && elem.flagChangeTask) {
							flagShow = true;
							showTasksRedux(flagShow, indexCategory, indexTask);
						}
					})
				} else {
					item.taskList.forEach((elem, indexTask) => {
						if (elem.taskText.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0) {
							flagShow = true;
							showTasksRedux(flagShow, indexCategory, indexTask);
						}
					})
				}
			}
		})
	}

	searchInputDelete(event) {
		const { categoryItemsRedux, showTasksRedux, hideTasksCompletedInputSearch } = this.props;
		let showDoneCheckbox = document.querySelector('.tasks-inputs__checkbox'),
			flagShow;

		event.target.previousElementSibling.value = '';

		if (showDoneCheckbox.checked) {
			categoryItemsRedux.forEach((item, indexCategory) => {
				item.taskList.forEach((item, indexTask) => {
					if (item.flagChangeTask) {
						flagShow = true;
						showTasksRedux(flagShow, indexCategory, indexTask);
					}
				})
			});
		} else {
			categoryItemsRedux.forEach((item) => {
				item.taskList.forEach((item) => {
					flagShow = true;
					hideTasksCompletedInputSearch(flagShow);
				})
			});
		}
	}

	// Show done tasks
	showDoneTasks(event) {
		const { categoryItemsRedux, showTasksRedux, hideTasksCompletedInputSearch } = this.props;
		let inputSearch = document.querySelector('.tasks-inputs__search input'),
			flagShow;

		if (event.target.checked) {
			categoryItemsRedux.forEach((item, indexCategory) => {
				if (inputSearch.value) {
					item.taskList.forEach((item, indexTask) => {
						if (item.flagChangeTask && item.show) { 
							flagShow = true;
							showTasksRedux(flagShow, indexCategory, indexTask);
						} else {
							flagShow = false;
							showTasksRedux(flagShow, indexCategory, indexTask);
						}
					})	
				} else {
					item.taskList.forEach((item, indexTask) => {
						if (item.flagChangeTask) {
							flagShow = true;
							showTasksRedux(flagShow, indexCategory, indexTask);
						} else {
							flagShow = false;
							showTasksRedux(flagShow, indexCategory, indexTask);
						}
					})
				}
			});
		} else {
			if (inputSearch.value) {
				categoryItemsRedux.forEach((item, indexCategory) => {
					item.taskList.forEach((item, indexTask) => {
						if (item.taskText.toLowerCase().indexOf(inputSearch.value.toLowerCase()) >= 0) {
							flagShow = true;
							showTasksRedux(flagShow, indexCategory, indexTask);
						}
					})
				})
			} else {
				categoryItemsRedux.forEach((item) => {
					item.taskList.forEach((item) => {
						flagShow = true;
						hideTasksCompletedInputSearch(flagShow);
					})
				});
			}
		}
	}

	/************************/
	/* SubCategory function */
	/************************/

	addSubCategoryItem(levelCategory, parentId, index) {
		const { categoryItemsRedux, addSubCategoryItemRedux } = this.props;
		let lengthNextLevel = levelCategory.length + 1,
			lastNumberLevel = 0,
			newNumberLevel  = [],
			maxIdCategory = 0,
			newSubCategoryItem;

		// Generation of a level number
		categoryItemsRedux.forEach((item) => {
			if (maxIdCategory < item.id) {
				maxIdCategory = item.id;
			}

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
		for (let j = 0; j < categoryItemsRedux.length; j++) {
			if (categoryItemsRedux[j].levelCategory.join('').indexOf(levelCategory.join('')) == 0 && 
				levelCategory != categoryItemsRedux[j].levelCategory
			) {
				index = j;
			}
		}

		newSubCategoryItem = {
			id: maxIdCategory + 1,
			parentId: parentId,
			text: '',
			checkedCategory: false,
			flagChangeText: true,
			levelCategory: newNumberLevel,
			taskList: []
		};

		addSubCategoryItemRedux(index, newSubCategoryItem);
	}

  render() {
    return (
    	<div className="app-main">
      		<CategoryArea 
      			addCategory={this.addCategory.bind(this)}
    			deleteCategoryItem={this.deleteCategoryItem.bind(this)}
    			toggleShowTasks={this.toggleShowTasks.bind(this)}
    			addSubCategoryItem={this.addSubCategoryItem.bind(this)}
      		/>
      		<TasksArea 
      			addTaskInCategory={this.addTaskInCategory.bind(this)}
      			searchTaskInput={this.searchTaskInput.bind(this)}
      			showDoneTasks={this.showDoneTasks.bind(this)}
      			searchInputDelete={this.searchInputDelete.bind(this)}
      		/>
      		<ModalWindow />
      	</div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		inputValueRedux: state.categoryTitle.inputValueRedux,
		categoryItemsRedux: state.categoryTitle.categoryItemsRedux,
		disabledTaskInputsRedux: state.categoryTitle.disabledTaskInputsRedux
	}
}

const mapActionsToProps = (dispatch) => {
	return {
		handleChangeInputRedux: bindActionCreators(handleChangeInputRedux, dispatch),
		addCategoryItemRedux: bindActionCreators(addCategoryItemRedux, dispatch),
		deleteCategoryItemRedux: bindActionCreators(deleteCategoryItemRedux, dispatch),
		addSubCategoryItemRedux: bindActionCreators(addSubCategoryItemRedux, dispatch),
		generationLevelCategoryRedux: bindActionCreators(generationLevelCategoryRedux, dispatch),
		filterCategoryItemsRedux: bindActionCreators(filterCategoryItemsRedux, dispatch),
		changeCheckedCategoryRedux: bindActionCreators(changeCheckedCategoryRedux, dispatch),
		changeDisabledTaskInputs: bindActionCreators(changeDisabledTaskInputs, dispatch),
		addTaskInCategoryRedux: bindActionCreators(addTaskInCategoryRedux, dispatch),
		hideTasksCompletedInputSearch: bindActionCreators(hideTasksCompletedInputSearch, dispatch),
		showTasksRedux: bindActionCreators(showTasksRedux, dispatch)
	};
}

export default connect(mapStateToProps, mapActionsToProps)(App);
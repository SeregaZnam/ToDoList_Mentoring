import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleChangeInputRedux, addCategoryItemRedux, deleteCategoryItemRedux, addSubCategoryItemRedux, generationLevelCategoryRedux, changeCheckedCategoryRedux, changeDisabledTaskInputs } from '../../actions/index';
import State from '../../stateApp';
import CategoryArea from '../CategoryArea/CategoryArea.jsx';
import TasksArea from '../TasksArea/TasksArea.jsx';
import ModalWindow from '../ModalWindow/ModalWindow.jsx';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		// textModalTask, isDoneModal, indexModalCategory and indexModalTask are created to save data in the modal window
		this.state = State;
		this.generationLevelCategory();
		this.filterCategoryItems();
	}

	generationLevelCategory() {
		let { categoryItemsRedux, generationLevelCategoryRedux } = this.props;
		let i = 1;

		categoryItemsRedux.forEach(item => {
			item.levelCategory = [];
		})

		categoryItemsRedux.forEach(item => {
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
		let { categoryItemsRedux } = this.props;
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

		categoryItemsRedux = filterCategoryItems;
	}

	// Adding a category from the component AddCategoryTitle
	addCategory(event) {
		let { inputValueRedux, categoryItemsRedux, addCategoryItemRedux } = this.props;
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
			maxLevelCategory = Math.max(...maxLevelCategory) + 1;

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
		let { categoryItemsRedux, deleteCategoryItemRedux } = this.props;
		let categoryItems = this.state.categoryItems,
			indices       = [];

		for (let i = 0; i < categoryItemsRedux.length; i++) {
			if (categoryItemsRedux[i].levelCategory.join('').indexOf(levelCategory.join('')) == 0) {
				indices.push(i);
			}
		}

		deleteCategoryItemRedux(index, indices.length);
	}

	// Show and hide tasks when clicking on a category
	toggleShowTasks(index) {
		let { categoryItemsRedux, changeCheckedCategoryRedux, changeDisabledTaskInputs } = this.props;
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

	addSubCategoryItem(levelCategory, parentId, index) {
		let { categoryItemsRedux, addSubCategoryItemRedux } = this.props;
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
      			categoryItems={this.state.categoryItems} 
      			inputValue={this.state.inputValue}
      			addCategory={this.addCategory.bind(this)}
    			deleteCategoryItem={this.deleteCategoryItem.bind(this)}
    			toggleShowTasks={this.toggleShowTasks.bind(this)}
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

const mapStateToProps = (state) => {
	return {
		inputValueRedux: state.categoryTitle.inputValueRedux,
		categoryItemsRedux: state.categoryTitle.categoryItemsRedux,
		disabledTaskInputsRedux: state.taskTitle.disabledTaskInputsRedux
	}
}

const mapActionsToProps = (dispatch) => {
	return {
		handleChangeInputRedux: bindActionCreators(handleChangeInputRedux, dispatch),
		addCategoryItemRedux: bindActionCreators(addCategoryItemRedux, dispatch),
		deleteCategoryItemRedux: bindActionCreators(deleteCategoryItemRedux, dispatch),
		addSubCategoryItemRedux: bindActionCreators(addSubCategoryItemRedux, dispatch),
		generationLevelCategoryRedux: bindActionCreators(generationLevelCategoryRedux, dispatch),
		changeCheckedCategoryRedux: bindActionCreators(changeCheckedCategoryRedux, dispatch),
		changeDisabledTaskInputs: bindActionCreators(changeDisabledTaskInputs, dispatch)
	};
}

export default connect(mapStateToProps, mapActionsToProps)(App);
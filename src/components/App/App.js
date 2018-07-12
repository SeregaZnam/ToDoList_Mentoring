import React, { Component } from 'react';
import CategoryArea from '../CategoryArea/CategoryArea';
import TasksArea from '../TasksArea/TasksArea';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inputValue: '',
			categoryItems: [
				{
					text: 'Category Test',
					checkedCategory: false,
					flagChangeText: false,
					taskList: [
						{taskText: 'To do test', flagChangeTask: true, show: true},
						{taskText: 'To do test2', flagChangeTask: true, show: true},
						{taskText: 'To do test3', flagChangeTask: false, show: true}
					]
				},
				{
					text: 'Category Test',
					checkedCategory: false,
					flagChangeText: false,
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
		event.preventDefault();
		this.state.categoryItems.push({ 
			text: this.state.inputValue, 
			checkedCategory: false,
			flagChangeText: false,
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

	submitCategoryInput(event) {
		event.preventDefault();
		// ..
	}

	// Changing text in a state when typing
	changeInputCategoryItem(event) {
		let index = event.target.getAttribute('data-index');

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
		let indexTask = event.target.getAttribute('data-index'),
			indexCategory = event.target.getAttribute('data-category');

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
      		/>
      		<TasksArea 
      			categoryItems={this.state.categoryItems}
      			handleCheckedTask={this.handleCheckedTask.bind(this)}
      			addTaskInCategory={this.addTaskInCategory.bind(this)}
      			searchTaskInput={this.searchTaskInput.bind(this)}
      			showDoneTasks={this.showDoneTasks.bind(this)}
      		/>
      	</div>
    );
  }
}

export default App;

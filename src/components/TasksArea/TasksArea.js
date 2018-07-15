import React, { Component } from 'react';
import TasksInputs from '../TasksInputs/TasksInputs';
import TaskList from '../TaskList/TaskList';
import './TasksArea.css';

class TasksArea extends Component {
  render() {
    return (
    	<div className="tasks-area">
      		<TasksInputs 
      			addTaskInCategory={this.props.addTaskInCategory.bind(this)}
      			searchTaskInput={this.props.searchTaskInput.bind(this)}
      			showDoneTasks={this.props.showDoneTasks.bind(this)}
      			searchInputDelete={this.props.searchInputDelete.bind(this)}
      		/>
      		<TaskList 
      			categoryItems={this.props.categoryItems}
      			handleCheckedTask={this.props.handleCheckedTask.bind(this)}
      			handleModalShow={this.props.handleModalShow.bind(this)}
      		/>
    	</div>
    );
  }
}

export default TasksArea;

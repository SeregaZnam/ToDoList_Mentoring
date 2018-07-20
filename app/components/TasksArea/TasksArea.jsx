import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TasksInputs from '../TasksInputs/TasksInputs.jsx';
import TaskList from '../TaskList/TaskList.jsx';
import './TasksArea.css';

class TasksArea extends Component {
  render() {
    return (
    	<div className="tasks-area">
      		<TasksInputs 
            disabledTaskInputs={this.props.disabledTaskInputs}          
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

TasksArea.propTypes = {
  addTaskInCategory: PropTypes.func.isRequired,
  categoryItems: PropTypes.array,
  disabledTaskInputs: PropTypes.bool.isRequired,
  handleCheckedTask: PropTypes.func.isRequired,
  handleModalShow: PropTypes.func.isRequired,
  searchInputDelete: PropTypes.func.isRequired,
  searchTaskInput: PropTypes.func.isRequired,
  showDoneTasks: PropTypes.func.isRequired
};

export default TasksArea;
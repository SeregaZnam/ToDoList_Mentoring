import React, { Component } from 'react';
import TasksInputs from '../TasksInputs/TasksInputs';
import TaskList from '../TaskList/TaskList';
import './TasksArea.css';

class TasksArea extends Component {
  render() {
    return (
    	<div className="tasks-area">
      		<TasksInputs />
      		<TaskList />
    	</div>
    );
  }
}

export default TasksArea;

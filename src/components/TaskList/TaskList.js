import React, { Component } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import './TaskList.css';

class TaskList extends Component {
  render() {
    return (
    	<div className="task-list">
      		<TaskItem />
    	</div>
    );
  }
}

export default TaskList;

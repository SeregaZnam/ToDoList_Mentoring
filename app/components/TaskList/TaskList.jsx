import React, { Component } from 'react';
import TaskItem from '../TaskItem/TaskItem.jsx';
import './TaskList.css';

class TaskList extends Component {
  render() {
  	let taskItems = this.props.categoryItems.map((item, indexCategory) => {
      let tasks;
  		if (item.checkedCategory) {
  			  tasks = item.taskList.map((item, indexTasks) => {
  				return <TaskItem 
  					key={indexTasks}
  					indexTasks={indexTasks}
  					indexCategory={indexCategory}
  					taskText={item.taskText}
  					flagChangeTask={item.flagChangeTask}
            show={item.show}
  					handleCheckedTask={this.props.handleCheckedTask.bind(this)}
            handleModalShow={this.props.handleModalShow.bind(this)}
  				/>
  			})
  			return tasks;
  		}
  	})

    return (
    	<div className="task-list">
      		{taskItems}
    	</div>
    );
  }
}

export default TaskList;

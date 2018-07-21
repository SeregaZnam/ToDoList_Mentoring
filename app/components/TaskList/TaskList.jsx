import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  					handleCheckedTask={this.props.handleCheckedTask}
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

TaskList.propTypes = {
  categoryItems: PropTypes.arrayOf(
    PropTypes.shape({
      taskText: PropTypes.string,
      flagChangeTask: PropTypes.bool,
      show: PropTypes.bool
    })
  ),
  handleCheckedTask: PropTypes.func.isRequired,
  handleModalShow: PropTypes.func.isRequired
};

export default TaskList;
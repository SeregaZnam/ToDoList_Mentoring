import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TaskItem from '../TaskItem/TaskItem.jsx';
import './TaskList.css';

class TaskList extends Component {
  static propTypes = {
    categoryItemsRedux: PropTypes.arrayOf(
      PropTypes.shape({
        taskText: PropTypes.string,
        flagChangeTask: PropTypes.bool,
        show: PropTypes.bool
      })
    ),
  };

  render() {
    const { categoryItemsRedux } = this.props;

  	const taskItems = categoryItemsRedux.map((item, indexCategory) => {
      let tasks;
  		if (item.checkedCategory) {
  			  tasks = item.taskList.map((item, indexTasks) => {
  				return <TaskItem 
  					key={indexTasks}
            item={item}
            show={item.show}
            taskText={item.taskText}
            flagChangeTask={item.flagChangeTask}
  					indexTasks={indexTasks}
  					indexCategory={indexCategory}
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

const mapStateToProps = (state) => {
  return {
    categoryItemsRedux: state.categoryTitle.categoryItemsRedux
  }
}

export default connect(mapStateToProps)(TaskList);
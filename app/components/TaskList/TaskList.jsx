import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TaskItem from '../TaskItem/TaskItem.jsx';
import './TaskList.css';

class TaskList extends Component {
  render() {
    let { categoryItemsRedux } = this.props;

  	let taskItems = categoryItemsRedux.map((item, indexCategory) => {
      let tasks;
  		if (item.checkedCategory) {
  			  tasks = item.taskList.map((item, indexTasks) => {
            console.log(item);
  				return <TaskItem 
  					key={indexTasks}
            item={item}
  					indexTasks={indexTasks}
  					indexCategory={indexCategory}
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
  categoryItemsRedux: PropTypes.arrayOf(
    PropTypes.shape({
      taskText: PropTypes.string,
      flagChangeTask: PropTypes.bool,
      show: PropTypes.bool
    })
  ),
  handleCheckedTask: PropTypes.func.isRequired,
  handleModalShow: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    categoryItemsRedux: state.categoryTitle.categoryItemsRedux
  }
}

export default connect(mapStateToProps)(TaskList);
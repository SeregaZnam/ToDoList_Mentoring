import React from 'react';
import PropTypes from 'prop-types';
import TasksInputs from '../TasksInputs/TasksInputs.jsx';
import TaskList from '../TaskList/TaskList.jsx';
import './TasksArea.css';

const TasksArea = ({ addTaskInCategory, categoryItems, disabledTaskInputs, handleCheckedTask, handleModalShow, searchInputDelete, searchTaskInput, showDoneTasks }) => {
  return <div className="tasks-area">
      <TasksInputs 
        disabledTaskInputs={disabledTaskInputs}          
        addTaskInCategory={addTaskInCategory}
        searchTaskInput={searchTaskInput}
        showDoneTasks={showDoneTasks}
        searchInputDelete={searchInputDelete}
      />
      <TaskList 
        categoryItems={categoryItems}
        handleCheckedTask={handleCheckedTask}
        handleModalShow={handleModalShow}
      />
  </div>;
};

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
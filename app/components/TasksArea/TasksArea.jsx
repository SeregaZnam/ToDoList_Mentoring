import React from 'react';
import PropTypes from 'prop-types';
import TasksInputs from '../TasksInputs/TasksInputs.jsx';
import TaskList from '../TaskList/TaskList.jsx';
import './TasksArea.css';

const TasksArea = ({ addTaskInCategory, categoryItems, searchInputDelete, searchTaskInput, showDoneTasks, filterCategoryItems }) => {
  return <div className="tasks-area">
      <TasksInputs 
        addTaskInCategory={addTaskInCategory}
        searchTaskInput={searchTaskInput}
        showDoneTasks={showDoneTasks}
        searchInputDelete={searchInputDelete}
      />
      <TaskList 
        categoryItems={categoryItems}
        filterCategoryItems={filterCategoryItems}
      />
  </div>;
};

TasksArea.propTypes = {
  addTaskInCategory: PropTypes.func.isRequired,
  categoryItems: PropTypes.array,
  searchInputDelete: PropTypes.func.isRequired,
  searchTaskInput: PropTypes.func.isRequired,
  showDoneTasks: PropTypes.func.isRequired
};

export default TasksArea;
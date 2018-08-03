import React from 'react';
import TasksInputs from '../TasksInputs/TasksInputs.jsx';
import TaskList from '../TaskList/TaskList.jsx';
import './TasksArea.css';

const TasksArea = () => {
  return <div className="tasks-area">
      <TasksInputs />
      <TaskList />
  </div>;
};

export default TasksArea;
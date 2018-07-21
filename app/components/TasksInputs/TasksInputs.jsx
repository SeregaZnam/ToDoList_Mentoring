import React from 'react';
import PropTypes from 'prop-types';
import TaskInputDone from '../TaskInputDone/TaskInputDone.jsx';
import TaskInputSearch from '../TaskInputSearch/TaskInputSearch.jsx';
import WriteNoteInput from '../WriteNoteInput/WriteNoteInput.jsx';
import './TasksInputs.css';

const TasksInputs = ({ addTaskInCategory, disabledTaskInputs, searchInputDelete, searchTaskInput, showDoneTasks }) => {
  let flagDisabled = disabledTaskInputs;

  return <div className="tasks-inputs">
    <TaskInputDone 
      flagDisabled={flagDisabled}
      showDoneTasks={showDoneTasks}
    />
    <TaskInputSearch 
      flagDisabled={flagDisabled}
      searchTaskInput={searchTaskInput}
      searchInputDelete={searchInputDelete}
    />
      <div className="tasks-inputs__title">
        <WriteNoteInput 
          addNote={addTaskInCategory}
          flagDisabled={flagDisabled}
        />
    </div>
  </div>;
};

TasksInputs.propTypes = {
  addTaskInCategory: PropTypes.func.isRequired,
  disabledTaskInputs: PropTypes.bool.isRequired,
  searchInputDelete: PropTypes.func.isRequired,
  searchTaskInput: PropTypes.func.isRequired,
  showDoneTasks: PropTypes.func.isRequired
};

export default TasksInputs;
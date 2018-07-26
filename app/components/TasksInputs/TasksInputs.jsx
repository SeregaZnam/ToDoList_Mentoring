import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TaskInputDone from '../TaskInputDone/TaskInputDone.jsx';
import TaskInputSearch from '../TaskInputSearch/TaskInputSearch.jsx';
import WriteNoteInput from '../WriteNoteInput/WriteNoteInput.jsx';
import './TasksInputs.css';

const TasksInputs = ({ addTaskInCategory, disabledTaskInputsRedux, searchInputDelete, searchTaskInput, showDoneTasks }) => {
  let flagDisabled = disabledTaskInputsRedux;

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
  disabledTaskInputsRedux: PropTypes.bool.isRequired,
  searchInputDelete: PropTypes.func.isRequired,
  searchTaskInput: PropTypes.func.isRequired,
  showDoneTasks: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    disabledTaskInputsRedux: state.taskTitle.disabledTaskInputsRedux
  }
}

export default connect(mapStateToProps)(TasksInputs);
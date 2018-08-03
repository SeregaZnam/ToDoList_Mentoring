import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTaskInCategoryRedux } from '../../actions/index';
import TaskInputDone from '../TaskInputDone/TaskInputDone.jsx';
import TaskInputSearch from '../TaskInputSearch/TaskInputSearch.jsx';
import WriteNoteInput from '../WriteNoteInput/WriteNoteInput.jsx';
import './TasksInputs.css';

class TasksInputs extends Component {
  addTaskInCategory(event) {
    const { categoryItemsRedux, addTaskInCategoryRedux } = this.props;
    let elemEvent  = event.target,
        addTaskInput = elemEvent.querySelector('input'),
        newTask;

    event.preventDefault();

    if (addTaskInput.value) {
      categoryItemsRedux.forEach((item, index) => {
        if (item.checkedCategory) {
          newTask = {
            taskText: addTaskInput.value, 
            flagChangeTask: false, 
            show: true
          };
          addTaskInCategoryRedux(newTask, index);
          return;
        }
      })
      addTaskInput.value = '';
    } else {
      elemEvent.classList.add('error');

      setTimeout(() => {
        elemEvent.classList.remove('error');
      }, 3000);
    }
  }



  render() {
    const { disabledTaskInputsRedux } = this.props;
    const flagDisabled = disabledTaskInputsRedux;

    return <div className="tasks-inputs">
      <TaskInputDone 
        flagDisabled={flagDisabled}
      />
      <TaskInputSearch 
        flagDisabled={flagDisabled}
      />
        <div className="tasks-inputs__title">
          <WriteNoteInput 
            addNote={(event) => {
              this.addTaskInCategory(event);
            }}
            flagDisabled={flagDisabled}
          />
      </div>
    </div>;
  }
};

TasksInputs.propTypes = {
  disabledTaskInputsRedux: PropTypes.bool.isRequired,
  addTaskInCategoryRedux: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    categoryItemsRedux: state.categoryTitle.categoryItemsRedux,
    addTaskInCategoryRedux: state.categoryTitle.addTaskInCategoryRedux,
    disabledTaskInputsRedux: state.categoryTitle.disabledTaskInputsRedux
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    addTaskInCategoryRedux: bindActionCreators(addTaskInCategoryRedux, dispatch)
  };
}

export default connect(mapStateToProps, mapActionsToProps)(TasksInputs);
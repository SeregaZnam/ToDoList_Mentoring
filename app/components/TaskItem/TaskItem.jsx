import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleCheckedTaskRedux, handleModalShowRedux } from '../../actions/index.js';
import { bindActionCreators } from 'redux';
import ImageComponent from '../ImageComponent/ImageComponent.jsx';
import { imageSrcEditTask } from '../ImageComponent/srcImage';
import './TaskItem.css';

const TaskItem = ({ item, handleCheckedTaskRedux, handleModalShowRedux, indexCategory, indexTasks }) => {
  // For correcting the click processing we create different id
  let idLabel = "category-item__checkbox--label-" + indexTasks + '-' + indexCategory;
  let showTask = item.show ? {display: 'block'} : {display: 'none'};
  
  return <div className="task-item" style={showTask}>
    <input 
      type="checkbox"
      id={idLabel}
      data-index={indexTasks}
      data-category={indexCategory}
      checked={item.flagChangeTask}
      onChange={(event) => {
        const eventElement  = event.target,
              indexTask     = eventElement.dataset.index,
              indexCategory = eventElement.dataset.category;
        handleCheckedTaskRedux(indexTask, indexCategory);
      }}
    />
    <label className="task-item__label" htmlFor={idLabel}>{item.taskText}</label>
    <ImageComponent 
      attributeClassName="task-item__editing"
      srcImage={imageSrcEditTask}
      funcOnClick={(event) => { 
        const eventElement  = event.target.previousElementSibling.previousElementSibling,
              indexCategory = eventElement.dataset.category,
              indexTask     = eventElement.dataset.index;
        handleModalShowRedux(indexCategory, indexTask); 
      }}
    />
  </div>;
};

TaskItem.propTypes = {
  item: PropTypes.shape({
    taskText: PropTypes.string.isRequired,
    flagChangeTask: PropTypes.bool.isRequired,
    show: PropTypes.bool.isRequired
  }),
  handleCheckedTaskRedux: PropTypes.func.isRequired,
  handleModalShowRedux: PropTypes.func.isRequired,
  indexCategory: PropTypes.number.isRequired,
  indexTasks: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {};
}

const mapActionsToProps = (dispatch) => {
  return {
    handleCheckedTaskRedux: bindActionCreators(handleCheckedTaskRedux, dispatch),
    handleModalShowRedux: bindActionCreators(handleModalShowRedux, dispatch)
  };
}

export default connect(mapStateToProps, mapActionsToProps)(TaskItem);
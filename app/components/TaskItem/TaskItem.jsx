import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleCheckedTaskRedux, handleModalShowRedux } from '../../actions/index.js';
import { bindActionCreators } from 'redux';
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
        let eventElement  = event.target,
            indexTask     = eventElement.dataset.index,
            indexCategory = eventElement.dataset.category;
        handleCheckedTaskRedux(indexTask, indexCategory);
      }}
    />
    <label className="task-item__label" htmlFor={idLabel}>{item.taskText}</label>
    <input 
      className="task-item__editing" 
      onClick={(event) => { 
        let eventElement  = event.target.previousElementSibling.previousElementSibling,
            indexCategory = eventElement.dataset.category,
            indexTask     = eventElement.dataset.index;
        handleModalShowRedux(indexCategory, indexTask); 
      }} 
      type="image" 
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIJSURBVGhD7Zm/S1ZRGMdvZEGKthUkKP4YhMKhmm1tE5xEhwjDH39D0FLQlIMYNRWI/QFJ4uAuuOuibuHQ4pCKUlp9vvfeQ+c93HdzeB44H/hwzz28w/2+5zznPfe8RSaTyWSuiBF8j1/xFXajK57hSzzDTXyHe3iAA+iCGfyDf3FZHTVduI8fyjvjKMQlzuInPMKHGFjEtapplxBCV3EdQ5hH6gBNs49V0yZhOs2Xd/+JwyzhOT5Ak4SR+ImaNjcxJoRRzWgBMEk8nTR99M03hVHNaMS0mpkjDqGCnsamMPHnzJE+XAgi4jAL6CLEKL7FFIVRzWg6mQ8h7uB41Wwh/Zwp4ofrxw1swk0IcQPHqmYLbkJ04vf6muImxC11wHB9jXETQhziYNVswU2IPlRNhBGJcRNCaHVyXdjapd7FJtyEEPrFdv1j97i2CTchxGRtipsQ8Q42xU0I0S6ImxDttuLCdIgXGD+cy614HMLtVnwK9ca2Wt453YpfQ5277uIvfI1NmA4hnuAF9qKOZI4xfacwH0Ks4LeqWQyhDstO8I06wEWIHjzFifKuKDpQL0fP8Td+QfMhxBz+wPT07x6qZswe2aRso/5weYpaqTQy66ia0QLQbltiCr1TqB6kwmhkNM0+o5ZerWYu0B8rIcgW6jD5NrpCNbGDCnNfHV5RENVEJpPJWKIo/gHiTqd1jOo86QAAAABJRU5ErkJggg==" />
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
  return {
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    handleCheckedTaskRedux: bindActionCreators(handleCheckedTaskRedux, dispatch),
    handleModalShowRedux: bindActionCreators(handleModalShowRedux, dispatch)
  };
}

export default connect(mapStateToProps, mapActionsToProps)(TaskItem);
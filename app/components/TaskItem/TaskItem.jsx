import React from 'react';
import PropTypes from 'prop-types';
import './TaskItem.css';

const TaskItem = ({ flagChangeTask, handleCheckedTask, handleModalShow, indexCategory, indexTasks, show, taskText }) => {
  // For correcting the click processing we create different id
  let idLabel = "category-item__checkbox--label-" + indexTasks + '-' + indexCategory;
  let showTask = show ? {display: 'block'} : {display: 'none'};

  return <div className="task-item" style={showTask}>
    <input 
      type="checkbox"
      id={idLabel}
      data-index={indexTasks}
      data-category={indexCategory}
      checked={flagChangeTask}
      onChange={handleCheckedTask}
    />
    <label className="task-item__label" htmlFor={idLabel}>{taskText}</label>
    <input className="task-item__editing" onClick={handleModalShow} type="image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIJSURBVGhD7Zm/S1ZRGMdvZEGKthUkKP4YhMKhmm1tE5xEhwjDH39D0FLQlIMYNRWI/QFJ4uAuuOuibuHQ4pCKUlp9vvfeQ+c93HdzeB44H/hwzz28w/2+5zznPfe8RSaTyWSuiBF8j1/xFXajK57hSzzDTXyHe3iAA+iCGfyDf3FZHTVduI8fyjvjKMQlzuInPMKHGFjEtapplxBCV3EdQ5hH6gBNs49V0yZhOs2Xd/+JwyzhOT5Ak4SR+ImaNjcxJoRRzWgBMEk8nTR99M03hVHNaMS0mpkjDqGCnsamMPHnzJE+XAgi4jAL6CLEKL7FFIVRzWg6mQ8h7uB41Wwh/Zwp4ofrxw1swk0IcQPHqmYLbkJ04vf6muImxC11wHB9jXETQhziYNVswU2IPlRNhBGJcRNCaHVyXdjapd7FJtyEEPrFdv1j97i2CTchxGRtipsQ8Q42xU0I0S6ImxDttuLCdIgXGD+cy614HMLtVnwK9ca2Wt453YpfQ5277uIvfI1NmA4hnuAF9qKOZI4xfacwH0Ks4LeqWQyhDstO8I06wEWIHjzFifKuKDpQL0fP8Td+QfMhxBz+wPT07x6qZswe2aRso/5weYpaqTQy66ia0QLQbltiCr1TqB6kwmhkNM0+o5ZerWYu0B8rIcgW6jD5NrpCNbGDCnNfHV5RENVEJpPJWKIo/gHiTqd1jOo86QAAAABJRU5ErkJggg==" />
  </div>;
};

TaskItem.propTypes = {
  flagChangeTask: PropTypes.bool.isRequired,
  handleCheckedTask: PropTypes.func.isRequired,
  handleModalShow: PropTypes.func.isRequired,
  indexCategory: PropTypes.number.isRequired,
  indexTasks: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
  taskText: PropTypes.string.isRequired
};

export default TaskItem;

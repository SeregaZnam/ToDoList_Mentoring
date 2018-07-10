import React, { Component } from 'react';
import './TaskItem.css';

class TaskItem extends Component {
  render() {
    return (
    	<div className="task-item">
   			<input 
   				type="checkbox"
   				id="task-item__checkbox--label"
   			/>
   			<label className="task-item__label" for="task-item__checkbox--label">To-Do Item #1</label>
   			<input className="task-item__editing" type="image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIJSURBVGhD7Zm/S1ZRGMdvZEGKthUkKP4YhMKhmm1tE5xEhwjDH39D0FLQlIMYNRWI/QFJ4uAuuOuibuHQ4pCKUlp9vvfeQ+c93HdzeB44H/hwzz28w/2+5zznPfe8RSaTyWSuiBF8j1/xFXajK57hSzzDTXyHe3iAA+iCGfyDf3FZHTVduI8fyjvjKMQlzuInPMKHGFjEtapplxBCV3EdQ5hH6gBNs49V0yZhOs2Xd/+JwyzhOT5Ak4SR+ImaNjcxJoRRzWgBMEk8nTR99M03hVHNaMS0mpkjDqGCnsamMPHnzJE+XAgi4jAL6CLEKL7FFIVRzWg6mQ8h7uB41Wwh/Zwp4ofrxw1swk0IcQPHqmYLbkJ04vf6muImxC11wHB9jXETQhziYNVswU2IPlRNhBGJcRNCaHVyXdjapd7FJtyEEPrFdv1j97i2CTchxGRtipsQ8Q42xU0I0S6ImxDttuLCdIgXGD+cy614HMLtVnwK9ca2Wt453YpfQ5277uIvfI1NmA4hnuAF9qKOZI4xfacwH0Ks4LeqWQyhDstO8I06wEWIHjzFifKuKDpQL0fP8Td+QfMhxBz+wPT07x6qZswe2aRso/5weYpaqTQy66ia0QLQbltiCr1TqB6kwmhkNM0+o5ZerWYu0B8rIcgW6jD5NrpCNbGDCnNfHV5RENVEJpPJWKIo/gHiTqd1jOo86QAAAABJRU5ErkJggg==" />
    	</div>
    );
  }
}

export default TaskItem;

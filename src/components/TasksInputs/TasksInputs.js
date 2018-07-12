import React, { Component } from 'react';
import { FormGroup, Button, InputGroup, FormControl } from 'react-bootstrap';
import './TasksInputs.css';

class TasksInputs extends Component {
  render() {
    return (
    	<div className="tasks-inputs">
    		<div className="tasks-inputs__done">
	      		<input 
	      			type="checkbox" 
	      			id="tasks-inputs__checkbox--label"
	      			className="tasks-inputs__checkbox"
              onChange={this.props.showDoneTasks.bind(this)}
	      		/>
	      		<label htmlFor="tasks-inputs__checkbox--label">Show done</label>
      		</div>
      		<div className="tasks-inputs__search">
      			<FormControl type="text" onChange={this.props.searchTaskInput.bind(this)} placeholder="Search"/>
      		</div>
      		<div className="tasks-inputs__title">
            <form onSubmit={this.props.addTaskInCategory.bind(this)}>
              <InputGroup>
    	      		<FormControl type="text" placeholder="Text input with button"/>
      		    	<InputGroup.Button>
      		        	<Button type="submit">Add</Button>
      		    	</InputGroup.Button>
              </InputGroup>
            </form>
		    </div>
    	</div>
    );
  }
}

export default TasksInputs;

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
	      		/>
	      		<label for="tasks-inputs__checkbox--label">Show done</label>
      		</div>
      		<div className="tasks-inputs__search">
      			<FormControl type="text" placeholder="Search"/>
      		</div>
      		<div className="tasks-inputs__title">
            <InputGroup>
  	      		<FormControl type="text" placeholder="Enter category title"/>
    		    	<InputGroup.Button>
    		        	<Button>Add</Button>
    		    	</InputGroup.Button>
            </InputGroup>
		    </div>
    	</div>
    );
  }
}

export default TasksInputs;

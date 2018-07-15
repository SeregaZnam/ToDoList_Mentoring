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
            <img className="tasks-inputs__search_delete" onClick={this.props.searchInputDelete.bind(this)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEpSURBVGhD7dk9CsJAEIbheABb7fUkHkKPY2krnskz2HoLO0Fn1A+WEEJ2szs/Mi98qKl80E2TLoqi6G9a0I609eeTbnva7vs2P0a8aDeaJuZAe9IetC1fyI2/PCM0MUDwdzjxhdI0MdUQSANTHYEkMc0QSALTHIFaYsQQqAVGHIFqYtQQqAZGHYHmYMwgUAnGHALlYMwi0BSMeQQaw7hBoCGMOwRKMXeaSwRiDCMYwLvQXJb+nXj9M+OiFHGm9c+Mi4YOdnpmXGDG7k5uMFNuseYxUxDILCYHgcxhShDIDGYOAqljaiCQGqYmAoljWiCQGKYlAjXHSCBQM4wkAlXHaCBQNYwmAvUxK1p2/MyOH3dpIRAwV9qSL5S0+b1qx79EMSKKoshaXfcGi/zGyoPvvCcAAAAASUVORK5CYII=" />
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

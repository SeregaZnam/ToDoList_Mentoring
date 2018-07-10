import React, { Component } from 'react';
import { FormGroup, Button, InputGroup, FormControl } from 'react-bootstrap';
import './AddCategoryTitle.css';

class AddCategoryTitle extends Component {
  render() {
    return (
    	<div className="add-category-title">
    		<FormGroup>
				<InputGroup>
					<FormControl type="text" placeholder="Enter category title"/>
			    	<InputGroup.Button>
			        	<Button>Add</Button>
			    	</InputGroup.Button>
				</InputGroup>
			</FormGroup>
    	</div>
    );
  }
}

export default AddCategoryTitle;

import React, { Component } from 'react';
import { FormGroup, Button, InputGroup, FormControl } from 'react-bootstrap';
import './AddCategoryTitle.css';

class AddCategoryTitle extends Component {
	constructor(props) {
		super(props);
	}

  render() {
    return (
    	<div className="add-category-title">
    		<form onSubmit={this.props.addCategory.bind(this)}>
	    		<FormGroup>
					<InputGroup>
						<FormControl 
							value={this.props.inputValue}
							type="text" 
							placeholder="Enter category title"
							onChange={this.props.handleChangeInput.bind(this)}
						/>
				    	<InputGroup.Button>
				        	<Button type="submit">Add</Button>
				    	</InputGroup.Button>
					</InputGroup>
				</FormGroup>
			</form>
    	</div>
    );
  }
}

export default AddCategoryTitle;

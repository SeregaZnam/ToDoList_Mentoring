import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Button, InputGroup, FormControl, Tooltip } from 'react-bootstrap';
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
					<Tooltip 
						placement="bottom" 
						className="in add-category-title__tooltip" 
						id="tooltip-bottom"
					>
						Fill in the field
					</Tooltip>
				</FormGroup>
			</form>
    	</div>
    );
  }
}

AddCategoryTitle.propTypes = {
	inputValue: PropTypes.string,
	addCategory: PropTypes.func.isRequired,
	handleChangeInput: PropTypes.func.isRequired
};

export default AddCategoryTitle;
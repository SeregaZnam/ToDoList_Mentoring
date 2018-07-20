import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WriteNoteInput from '../WriteNoteInput/WriteNoteInput.jsx';
import './AddCategoryTitle.css';

class AddCategoryTitle extends Component {
	constructor(props) {
		super(props);
	}

  render() {
    return (
    	<div className="add-category-title">
    		<WriteNoteInput 
    			inputValue={this.props.inputValue}
				addNote={this.props.addCategory}
				handleChangeInput={this.props.handleChangeInput}
    		/>
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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Button, InputGroup, FormControl, Tooltip } from 'react-bootstrap';
import './WriteNoteInput.css';

class WriteNoteInput extends Component {
	render() {
		let formControl, flagDisabled;

		flagDisabled = this.props.flagDisabled == undefined ? false : this.props.flagDisabled;

		if (this.props.inputValue != undefined && this.props.handleChangeInput != undefined) {
			formControl = <FormControl 
				value={this.props.inputValue}
				type="text" 
				placeholder="Enter category title"
				onChange={this.props.handleChangeInput.bind(this)}
			/>;
		} else {
			formControl = <FormControl 
				type="text" 
				placeholder="Enter task text"
				disabled={flagDisabled}
			/>;
		}

		return <form 
			className="add-note-title"
			onSubmit={this.props.addNote.bind(this)}
			>
			<FormGroup>
				<InputGroup>
					{formControl}
			    	<InputGroup.Button>
			        	<Button type="submit" disabled={flagDisabled}>Add</Button>
			    	</InputGroup.Button>
				</InputGroup>
				<Tooltip 
					placement="bottom" 
					className="in add-note-title__tooltip" 
					id="tooltip-bottom"
				>
					Fill in the field
				</Tooltip>
			</FormGroup>
		</form>
	}
}

WriteNoteInput.propTypes = {
	addNote: PropTypes.func.isRequired,
	inputValue: PropTypes.string,
	handleChangeInput: PropTypes.func,
	flagDisabled: PropTypes.bool
};

export default WriteNoteInput;
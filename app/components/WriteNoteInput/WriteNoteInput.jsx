import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Button, InputGroup, FormControl, Tooltip } from 'react-bootstrap';
import './WriteNoteInput.css';

const WriteNoteInput = ({ flagDisabled, inputValue, handleChangeInput, addNote }) => {
	let formControl;

	flagDisabled = flagDisabled == undefined ? false : flagDisabled;

	if (inputValue != undefined && handleChangeInput != undefined) {
		formControl = <FormControl 
			value={inputValue}
			type="text" 
			placeholder="Enter category title"
			onChange={handleChangeInput}
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
		onSubmit={addNote}
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
	</form>;
}

WriteNoteInput.propTypes = {
	addNote: PropTypes.func.isRequired,
	inputValue: PropTypes.string,
	handleChangeInput: PropTypes.func,
	flagDisabled: PropTypes.bool
};

export default WriteNoteInput;
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleChangeInputRedux } from '../../actions/index';
import { FormGroup, Button, InputGroup, FormControl, Tooltip } from 'react-bootstrap';
import './WriteNoteInput.css';

const WriteNoteInput = ({ flagDisabled, inputValue, handleChangeInput, addNote, inputValueRedux, handleChangeInputRedux }) => {
	let formControl;

	flagDisabled = flagDisabled == undefined ? false : flagDisabled;

	if (inputValue != undefined && handleChangeInput != undefined) {
		formControl = <FormControl 
			value={inputValueRedux}
			type="text" 
			placeholder="Enter category title"
			onChange={(event) => {
				handleChangeInputRedux(event.target.value);
			}}
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


const mapStateToProps = (state) => {
	return {
		inputValueRedux: state.inputValue
	}
}

const mapActionsToProps = (dispatch) => {
	return {
		handleChangeInputRedux: bindActionCreators(handleChangeInputRedux, dispatch)
	};
}

export default connect(mapStateToProps, mapActionsToProps)(WriteNoteInput);
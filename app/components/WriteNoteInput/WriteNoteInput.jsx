import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleChangeInputRedux } from '../../actions/index.js';
import { FormGroup, Button, InputGroup, FormControl, Tooltip } from 'react-bootstrap';
import './WriteNoteInput.css';

class WriteNoteInput extends Component {
	static propTypes = {
		addNote: PropTypes.func.isRequired,
		inputValueRedux: PropTypes.string,
		handleChangeInputRedux: PropTypes.func,
		flagDisabled: PropTypes.bool,
		flagAddCategory: PropTypes.bool
	};

	render() {
		let { flagAddCategory, flagDisabled, addNote, inputValueRedux, handleChangeInputRedux } = this.props;
		let formControl;

		flagDisabled = flagDisabled == undefined ? false : flagDisabled;
		if (flagAddCategory) {
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
			        	<Button 
			        		type="submit" 
			        		disabled={flagDisabled}
			        	>
			        		Add
			        	</Button>
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
}

const mapStateToProps = (state) => {
	return {
		inputValueRedux: state.categoryTitle.inputValueRedux
	}
}

const mapActionsToProps = (dispatch) => {
	return {
		handleChangeInputRedux: bindActionCreators(handleChangeInputRedux, dispatch)
	};
}

export default connect(mapStateToProps, mapActionsToProps)(WriteNoteInput);
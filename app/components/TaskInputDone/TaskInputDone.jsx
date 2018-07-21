import React from 'react';
import PropTypes from 'prop-types';
import './TaskInputDone.css';

const TaskInputDone = ({ flagDisabled, showDoneTasks }) => {
	return <div className="tasks-inputs__done">
		<input 
			type="checkbox" 
			id="tasks-inputs__checkbox--label"
			className="tasks-inputs__checkbox"
			disabled={flagDisabled}
			onChange={showDoneTasks}
		/>
		<label htmlFor="tasks-inputs__checkbox--label">Show done</label>
	</div>;
};

TaskInputDone.propTypes = {
	flagDisabled: PropTypes.bool.isRequired,
	showDoneTasks: PropTypes.func.isRequired
};

export default TaskInputDone;
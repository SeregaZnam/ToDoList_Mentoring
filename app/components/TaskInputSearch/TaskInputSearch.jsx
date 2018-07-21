import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
import './TaskInputSearch.css';

const TaskInputSearch = ({ flagDisabled, searchTaskInput, searchInputDelete }) => {
	return <div className="tasks-inputs__search">
		<FormControl 
			type="text" 
			placeholder="Search"
			disabled={flagDisabled}
			onChange={searchTaskInput} 
			/>
		<img className="tasks-inputs__search_delete" onClick={searchInputDelete} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEpSURBVGhD7dk9CsJAEIbheABb7fUkHkKPY2krnskz2HoLO0Fn1A+WEEJ2szs/Mi98qKl80E2TLoqi6G9a0I609eeTbnva7vs2P0a8aDeaJuZAe9IetC1fyI2/PCM0MUDwdzjxhdI0MdUQSANTHYEkMc0QSALTHIFaYsQQqAVGHIFqYtQQqAZGHYHmYMwgUAnGHALlYMwi0BSMeQQaw7hBoCGMOwRKMXeaSwRiDCMYwLvQXJb+nXj9M+OiFHGm9c+Mi4YOdnpmXGDG7k5uMFNuseYxUxDILCYHgcxhShDIDGYOAqljaiCQGqYmAoljWiCQGKYlAjXHSCBQM4wkAlXHaCBQNYwmAvUxK1p2/MyOH3dpIRAwV9qSL5S0+b1qx79EMSKKoshaXfcGi/zGyoPvvCcAAAAASUVORK5CYII=" />
	</div>;
};

TaskInputSearch.propTypes = {
	flagDisabled: PropTypes.bool.isRequired,
	searchTaskInput: PropTypes.func.isRequired,
	searchInputDelete: PropTypes.func.isRequired
};

export default TaskInputSearch;
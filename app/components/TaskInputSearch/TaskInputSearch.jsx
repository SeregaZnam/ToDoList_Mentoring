import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
import ImageComponent from '../ImageComponent/ImageComponent.jsx';
import { imageSrcInputSearchDelete } from '../ImageComponent/srcImage';
import './TaskInputSearch.css';

const TaskInputSearch = ({ flagDisabled, searchTaskInput, searchInputDelete }) => {
	return <div className="tasks-inputs__search">
		<FormControl 
			type="text" 
			placeholder="Search"
			disabled={flagDisabled}
			onChange={searchTaskInput} 
			/>
		<ImageComponent 
            attributeClassName="tasks-inputs__search_delete"
            srcImage={imageSrcInputSearchDelete}
            funcOnClick={searchInputDelete}
        />
	</div>;
};

TaskInputSearch.propTypes = {
	flagDisabled: PropTypes.bool.isRequired,
	searchTaskInput: PropTypes.func.isRequired,
	searchInputDelete: PropTypes.func.isRequired
};

export default TaskInputSearch;
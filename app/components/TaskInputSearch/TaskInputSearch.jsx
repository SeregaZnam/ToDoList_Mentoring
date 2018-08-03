import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideTasksCompletedInputSearch, showTasksRedux } from '../../actions/index';
import { FormControl } from 'react-bootstrap';
import ImageComponent from '../ImageComponent/ImageComponent.jsx';
import { imageSrcInputSearchDelete } from '../ImageComponent/srcImage';
import './TaskInputSearch.css';

class TaskInputSearch extends Component {
	searchTaskInput(event) {
		const { categoryItemsRedux, hideTasksCompletedInputSearch, showTasksRedux } = this.props;
		let showDoneCheckbox = document.querySelector('.tasks-inputs__checkbox'),
			flagShow;

		// Hide tasks with a completed input search
		if (event.target.value) {
			flagShow = false;
			hideTasksCompletedInputSearch(flagShow);
		} else {
			if (showDoneCheckbox.checked) {
				categoryItemsRedux.forEach((item, indexCategory) => {
					item.taskList.forEach((item, indexTask) => {
						if (item.flagChangeTask) {
							flagShow = true;
							showTasksRedux(flagShow, indexCategory, indexTask);
						} else {
							flagShow = false;
							showTasksRedux(flagShow, indexCategory, indexTask);
						}
					})
				});
			} else {
				flagShow = true;
				hideTasksCompletedInputSearch(flagShow);
			}
		}

		// Show task a searchable match
		categoryItemsRedux.forEach((item, indexCategory) => {
			if (item.checkedCategory) {
				if (showDoneCheckbox.checked) {
					item.taskList.forEach((elem, indexTask) => {
						if (elem.taskText.toLowerCase().indexOf(event.target.value) >= 0 && elem.flagChangeTask) {
							flagShow = true;
							showTasksRedux(flagShow, indexCategory, indexTask);
						}
					})
				} else {
					item.taskList.forEach((elem, indexTask) => {
						if (elem.taskText.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0) {
							flagShow = true;
							showTasksRedux(flagShow, indexCategory, indexTask);
						}
					})
				}
			}
		})
	}

	searchInputDelete(event) {
		const { categoryItemsRedux, showTasksRedux, hideTasksCompletedInputSearch } = this.props;
		let showDoneCheckbox = document.querySelector('.tasks-inputs__checkbox'),
			flagShow;

		event.target.previousElementSibling.value = '';

		if (showDoneCheckbox.checked) {
			categoryItemsRedux.forEach((item, indexCategory) => {
				item.taskList.forEach((item, indexTask) => {
					if (item.flagChangeTask) {
						flagShow = true;
						showTasksRedux(flagShow, indexCategory, indexTask);
					}
				})
			});
		} else {
			categoryItemsRedux.forEach((item) => {
				item.taskList.forEach((item) => {
					flagShow = true;
					hideTasksCompletedInputSearch(flagShow);
				})
			});
		}
	}

	render() {
		const { flagDisabled } = this.props;

		return <div className="tasks-inputs__search">
			<FormControl 
				type="text" 
				placeholder="Search"
				disabled={flagDisabled}
				onChange={(event) => {
					this.searchTaskInput(event);
				}} 
				/>
			<ImageComponent 
	            attributeClassName="tasks-inputs__search_delete"
	            srcImage={imageSrcInputSearchDelete}
	            funcOnClick={(event) => {
	            	this.searchInputDelete(event);
	            }}
	        />
		</div>;
	}
};

TaskInputSearch.propTypes = {
	flagDisabled: PropTypes.bool.isRequired,
	searchInputDelete: PropTypes.func,
	hideTasksCompletedInputSearch: PropTypes.func.isRequired,
	showTasksRedux: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    categoryItemsRedux: state.categoryTitle.categoryItemsRedux,
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    hideTasksCompletedInputSearch: bindActionCreators(hideTasksCompletedInputSearch, dispatch),
    showTasksRedux: bindActionCreators(showTasksRedux, dispatch)
  };
}

export default connect(mapStateToProps, mapActionsToProps)(TaskInputSearch);
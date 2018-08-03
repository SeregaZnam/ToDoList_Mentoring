import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showTasksRedux, hideTasksCompletedInputSearch } from '../../actions/index';
import './TaskInputDone.css';

class TaskInputDone extends Component {
	showDoneTasks(event) {
		const { categoryItemsRedux, showTasksRedux, hideTasksCompletedInputSearch } = this.props;
		let inputSearch = document.querySelector('.tasks-inputs__search input'),
			flagShow;

		if (event.target.checked) {
			categoryItemsRedux.forEach((item, indexCategory) => {
				if (inputSearch.value) {
					item.taskList.forEach((item, indexTask) => {
						if (item.flagChangeTask && item.show) { 
							flagShow = true;
							showTasksRedux(flagShow, indexCategory, indexTask);
						} else {
							flagShow = false;
							showTasksRedux(flagShow, indexCategory, indexTask);
						}
					})	
				} else {
					item.taskList.forEach((item, indexTask) => {
						if (item.flagChangeTask) {
							flagShow = true;
							showTasksRedux(flagShow, indexCategory, indexTask);
						} else {
							flagShow = false;
							showTasksRedux(flagShow, indexCategory, indexTask);
						}
					})
				}
			});
		} else {
			if (inputSearch.value) {
				categoryItemsRedux.forEach((item, indexCategory) => {
					item.taskList.forEach((item, indexTask) => {
						if (item.taskText.toLowerCase().indexOf(inputSearch.value.toLowerCase()) >= 0) {
							flagShow = true;
							showTasksRedux(flagShow, indexCategory, indexTask);
						}
					})
				})
			} else {
				categoryItemsRedux.forEach((item) => {
					item.taskList.forEach((item) => {
						flagShow = true;
						hideTasksCompletedInputSearch(flagShow);
					})
				});
			}
		}
	}

	render() {
		const { flagDisabled } = this.props;

		return <div className="tasks-inputs__done">
			<input 
				type="checkbox" 
				id="tasks-inputs__checkbox--label"
				className="tasks-inputs__checkbox"
				disabled={flagDisabled}
				onChange={(event) => {
					this.showDoneTasks(event);
				}}
			/>
			<label htmlFor="tasks-inputs__checkbox--label">Show done</label>
		</div>;
	}
};

TaskInputDone.propTypes = {
	categoryItemsRedux: PropTypes.arrayOf(
      PropTypes.shape({
        taskText: PropTypes.string,
        flagChangeTask: PropTypes.bool,
        show: PropTypes.bool
      })
    ),
	flagDisabled: PropTypes.bool.isRequired,
	showTasksRedux: PropTypes.func.isRequired,
	hideTasksCompletedInputSearch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    categoryItemsRedux: state.categoryTitle.categoryItemsRedux,
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    showTasksRedux: bindActionCreators(showTasksRedux, dispatch),
    hideTasksCompletedInputSearch: bindActionCreators(hideTasksCompletedInputSearch, dispatch)
  };
}

export default connect(mapStateToProps, mapActionsToProps)(TaskInputDone);
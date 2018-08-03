import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeCheckedCategoryRedux, changeDisabledTaskInputs } from '../../actions/index';

class ChangeItemCategoryNode extends Component {
	static propTypes = {
		changeCheckedCategoryRedux: PropTypes.func.isRequired,
		changeDisabledTaskInputs: PropTypes.func.isRequired,
	    index: PropTypes.number.isRequired,
	    item: PropTypes.shape({
	        text: PropTypes.text
	    })
	};

	toggleShowTasks(indexTask) {
		const { categoryItemsRedux } = this.props;
		let attributeDisabled;

		this.props.changeCheckedCategoryRedux(indexTask);

		attributeDisabled = categoryItemsRedux.some((item) => {
			if (item.checkedCategory) { 
				return true;
			} 
			return false;
		})
		
		this.props.changeDisabledTaskInputs(!attributeDisabled);
	}

	render() {
		const { item, index } = this.props;
		let idLabel = "category-item__checkbox--label-" + index;

		return <span>
	        <input 
	            type="checkbox"
	            id={idLabel}
	            className="category-item__checkbox"
	            onChange={() => {
	            	this.toggleShowTasks(index);
	            }}
	        />
	        <label htmlFor={idLabel} className="category-item__text">
	            {item.text}
	        </label>
	    </span>;
	}
}

const mapStateToProps = (state) => {
    return {
    	categoryItemsRedux: state.categoryTitle.categoryItemsRedux
    };
}

const mapActionsToProps = (dispatch) => {
    return {
        changeCheckedCategoryRedux: bindActionCreators(changeCheckedCategoryRedux, dispatch),
        changeDisabledTaskInputs: bindActionCreators(changeDisabledTaskInputs, dispatch)
    };
}

export default connect(mapStateToProps, mapActionsToProps)(ChangeItemCategoryNode);

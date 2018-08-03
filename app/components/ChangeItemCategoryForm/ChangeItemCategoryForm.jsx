import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submitCategoryInputRedux, changeInputCategoryItemRedux } from '../../actions/index';

const ChangeItemCategoryForm = ({ item, index, submitCategoryInputRedux, changeInputCategoryItemRedux }) => {
	return <form 
        className="category-item__form" 
        onSubmit={(event) => {
            let element = event.target.children[0],
                indexCategory = element.dataset.index,
                elementValue  = element.value;

            submitCategoryInputRedux(indexCategory, elementValue);
        }}
        >
        <input 
            type="text" 
            className="category-item__form_input" 
            defaultValue={item.text}
            data-index={index}
            onChange={(event) => {
                let element = event.target.children[0],
                    indexCategory = event.target.dataset.index,
                    elementValue  = event.target.value;

                changeInputCategoryItemRedux(indexCategory, elementValue);
            }}
            />
    </form>;
}

ChangeItemCategoryForm.propTypes = {
    changeInputCategoryItemRedux: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    submitCategoryInputRedux: PropTypes.func.isRequired,
    item: PropTypes.shape({
        text: PropTypes.text
    })
};

const mapStateToProps = (state) => {
    return {};
}

const mapActionsToProps = (dispatch) => {
    return {
        submitCategoryInputRedux: bindActionCreators(submitCategoryInputRedux, dispatch),
        changeInputCategoryItemRedux: bindActionCreators(changeInputCategoryItemRedux, dispatch)
    };
}

export default connect(mapStateToProps, mapActionsToProps)(ChangeItemCategoryForm);

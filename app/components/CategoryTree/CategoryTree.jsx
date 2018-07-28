import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CategoryItem from '../CategoryItem/CategoryItem.jsx';
import './CategoryTree.css';

const CategoryTree = ({ addSubCategoryItem, categoryItemsRedux, deleteCategoryItem, toggleShowTasks }) => {
    let categoryItemNodes = categoryItemsRedux.map((item, index) => {
        return <div key={index}>
            <CategoryItem 
                index={index}
                item={item}
                deleteCategoryItem={deleteCategoryItem}
                toggleShowTasks={toggleShowTasks}
                addSubCategoryItem={addSubCategoryItem}
            />
        </div>
    });

    return <div className="category-tree">
        {categoryItemNodes}
    </div>;
};

CategoryTree.propTypes = {
    addSubCategoryItem: PropTypes.func.isRequired,
    categoryItemsRedux: PropTypes.array,
    deleteCategoryItem: PropTypes.func.isRequired,
    toggleShowTasks: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        categoryItemsRedux: state.categoryTitle.categoryItemsRedux
    }
}

export default connect(mapStateToProps)(CategoryTree);
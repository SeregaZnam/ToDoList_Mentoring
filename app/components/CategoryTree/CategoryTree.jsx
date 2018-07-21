import React from 'react';
import PropTypes from 'prop-types';
import CategoryItem from '../CategoryItem/CategoryItem.jsx';
import './CategoryTree.css';

const CategoryTree = ({ addSubCategoryItem, categoryItems, changeCategoryText, changeInputCategoryItem, deleteCategoryItem, submitCategoryInput, toggleShowTasks }) => {
    let categoryItemNodes = categoryItems.map((item, index) => {
        return <div key={index}>
            <CategoryItem 
                index={index}
                item={item}
                deleteCategoryItem={deleteCategoryItem}
                changeCategoryText={changeCategoryText}
                toggleShowTasks={toggleShowTasks}
                submitCategoryInput={submitCategoryInput}
                changeInputCategoryItem={changeInputCategoryItem}
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
    categoryItems: PropTypes.array,
    changeCategoryText: PropTypes.func.isRequired,
    changeInputCategoryItem: PropTypes.func.isRequired,
    deleteCategoryItem: PropTypes.func.isRequired,
    submitCategoryInput: PropTypes.func.isRequired,
    toggleShowTasks: PropTypes.func.isRequired
};

export default CategoryTree;
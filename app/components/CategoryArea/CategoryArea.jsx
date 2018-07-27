import React from 'react';
import PropTypes from 'prop-types';
import AddCategoryTitle from '../AddCategoryTitle/AddCategoryTitle.jsx';
import CategoryTree from '../CategoryTree/CategoryTree.jsx';
import './CategoryArea.css';

const CategoryArea = ({ addCategory, addSubCategoryItem, deleteCategoryItem, toggleShowTasks }) => {
  return <div className="category-area">
    <AddCategoryTitle 
      addCategory={addCategory}
    />
    <CategoryTree 
      deleteCategoryItem={deleteCategoryItem}
      toggleShowTasks={toggleShowTasks}
      addSubCategoryItem={addSubCategoryItem}
    />
  </div>;
};

CategoryArea.propTypes = {
  addCategory: PropTypes.func.isRequired,
  addSubCategoryItem: PropTypes.func.isRequired,
  deleteCategoryItem: PropTypes.func.isRequired,
  toggleShowTasks: PropTypes.func.isRequired
};

export default CategoryArea;
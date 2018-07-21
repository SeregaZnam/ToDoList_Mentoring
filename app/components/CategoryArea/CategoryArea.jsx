import React from 'react';
import PropTypes from 'prop-types';
import AddCategoryTitle from '../AddCategoryTitle/AddCategoryTitle.jsx';
import CategoryTree from '../CategoryTree/CategoryTree.jsx';
import './CategoryArea.css';

const CategoryArea = ({ inputValue, categoryItems, addCategory, addSubCategoryItem, changeCategoryText, changeInputCategoryItem, deleteCategoryItem, handleChangeInput, submitCategoryInput, toggleShowTasks }) => {
  categoryItems = categoryItems.map((item) => {
    return item;
  });

  return <div className="category-area">
    <AddCategoryTitle 
      inputValue={inputValue}
      addCategory={addCategory}
      handleChangeInput={handleChangeInput}
    />
    <CategoryTree 
      categoryItems={categoryItems} 
      deleteCategoryItem={deleteCategoryItem}
      changeCategoryText={changeCategoryText}
      toggleShowTasks={toggleShowTasks}
      submitCategoryInput={submitCategoryInput}
      changeInputCategoryItem={changeInputCategoryItem}
      addSubCategoryItem={addSubCategoryItem}
    />
  </div>;
};

CategoryArea.propTypes = {
  inputValue: PropTypes.string,
  categoryItems: PropTypes.array,
  addCategory: PropTypes.func.isRequired,
  addSubCategoryItem: PropTypes.func.isRequired,
  changeCategoryText: PropTypes.func.isRequired,
  changeInputCategoryItem: PropTypes.func.isRequired,
  deleteCategoryItem: PropTypes.func.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  submitCategoryInput: PropTypes.func.isRequired,
  toggleShowTasks: PropTypes.func.isRequired
};

export default CategoryArea;

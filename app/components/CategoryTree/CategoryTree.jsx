import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoryItem from '../CategoryItem/CategoryItem.jsx';
import './CategoryTree.css';

class CategoryTree extends Component {
  render() {
    let categoryItemNodes = this.props.categoryItems.map((item, index) => {
        return <div key={index}>
            <CategoryItem 
                index={index}
                text={item.text}
                levelCategory={item.levelCategory}
                checkedCategory={item.checkedCategory}
                flagChangeText={item.flagChangeText}
                deleteCategoryItem={this.props.deleteCategoryItem.bind(this)}
                changeCategoryText={this.props.changeCategoryText.bind(this)}
                toggleShowTasks={this.props.toggleShowTasks.bind(this)}
                submitCategoryInput={this.props.submitCategoryInput.bind(this)}
                changeInputCategoryItem={this.props.changeInputCategoryItem.bind(this)}
                addSubCategoryItem={this.props.addSubCategoryItem.bind(this)}
            />
        </div>
    });

    return (
    	<div className="category-tree">
    		{categoryItemNodes}
    	</div>
    );
  }
}

CategoryTree.propTypes = {
    addSubCategoryItem: PropTypes.func.isRequired,
    categoryItems: PropTypes.arrayOf(
        PropTypes.shape({
            checkedCategory: PropTypes.bool.isRequired,
            flagChangeText: PropTypes.bool.isRequired,
            levelCategory: PropTypes.array.isRequired,
            taskList: PropTypes.array,
            text: PropTypes.string
        })
    ),
    changeCategoryText: PropTypes.func.isRequired,
    changeInputCategoryItem: PropTypes.func.isRequired,
    deleteCategoryItem: PropTypes.func.isRequired,
    submitCategoryInput: PropTypes.func.isRequired,
    toggleShowTasks: PropTypes.func.isRequired
};

export default CategoryTree;

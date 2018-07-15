import React, { Component } from 'react';
import CategoryItem from '../CategoryItem/CategoryItem';
import SubCategoryItem from '../SubCategoryItem/SubCategoryItem';
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

export default CategoryTree;

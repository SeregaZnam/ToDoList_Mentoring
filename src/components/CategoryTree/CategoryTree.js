import React, { Component } from 'react';
import CategoryItem from '../CategoryItem/CategoryItem';
import SubCategoryItem from '../SubCategoryItem/SubCategoryItem';
import './CategoryTree.css';

class CategoryTree extends Component {
  render() {
    // Skip data to output a category in CategoryItem
    let categoryItemNodes = this.props.categoryItems.map((item, index) => {
        return <CategoryItem 
            key={index} 
            index={index}
            text={item.text}
            checkedCategory={item.checkedCategory}
            flagChangeText={item.flagChangeText}
            deleteCategoryItem={this.props.deleteCategoryItem.bind(this)}
            changeCategoryText={this.props.changeCategoryText.bind(this)}
            toggleShowTasks={this.props.toggleShowTasks.bind(this)}
            submitCategoryInput={this.props.submitCategoryInput.bind(this)}
            changeInputCategoryItem={this.props.changeInputCategoryItem.bind(this)}
        />
    });

    return (
    	<div className="category-tree">
    		{categoryItemNodes}
    		<div className="category-tree__subcategory">
    			<SubCategoryItem />
    		</div>
    	</div>
    );
  }
}

export default CategoryTree;

import React, { Component } from 'react';
import CategoryItem from '../CategoryItem/CategoryItem';
import SubCategoryItem from '../SubCategoryItem/SubCategoryItem';
import './CategoryTree.css';

class CategoryTree extends Component {
  render() {
    // Skip data to output a category in CategoryItem
    let categoryItemNodes = this.props.categoryItems.map((item, index) => {
        let subCategoryItems = null;

        if (item.subCategoryItems) {
            subCategoryItems = item.subCategoryItems.map((elem, subIndex) => {
                return <SubCategoryItem 
                    key={subIndex}
                    categoryIndex={index}
                    subCategoryIndex={subIndex}
                    text={elem.text}
                    checkedSubCategory={elem.checkedSubCategory}
                    flagChangeTextSubCategory={elem.flagChangeTextSubCategory}
                    changeInputSubCategoryItem={this.props.changeInputSubCategoryItem.bind(this)}
                    submitSubCategoryInput={this.props.submitSubCategoryInput.bind(this)}
                    toggleShowSubTasks={this.props.toggleShowSubTasks.bind(this)}
                    changeSubCategoryText={this.props.changeSubCategoryText.bind(this)}
                    deleteSubCategoryItem={this.props.deleteSubCategoryItem.bind(this)}
                />;
            })
        }

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
            <div className="category-tree__subcategory">
                {subCategoryItems}
            </div>
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

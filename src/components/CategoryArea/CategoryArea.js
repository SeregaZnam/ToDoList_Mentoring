import React, { Component } from 'react';
import AddCategoryTitle from '../AddCategoryTitle/AddCategoryTitle';
import CategoryTree from '../CategoryTree/CategoryTree';
import './CategoryArea.css';

class CategoryArea extends Component {
  render() {
  	// Skip data to output a category in CategotyTree
  	let categoryItems = this.props.categoryItems.map((item) => {
  		return item;
  	});

    return (
    	<div className="category-area">
    		<AddCategoryTitle 
    			inputValue={this.props.inputValue}
    			addCategory={this.props.addCategory.bind(this)}
    			handleChangeInput={this.props.handleChangeInput.bind(this)}
    		/>
    		<CategoryTree 
    			categoryItems={categoryItems} 
    			deleteCategoryItem={this.props.deleteCategoryItem.bind(this)}
    			changeCategoryText={this.props.changeCategoryText.bind(this)}
    			toggleShowTasks={this.props.toggleShowTasks.bind(this)}
    			submitCategoryInput={this.props.submitCategoryInput.bind(this)}
    			changeInputCategoryItem={this.props.changeInputCategoryItem.bind(this)}
          addSubCategoryItem={this.props.addSubCategoryItem.bind(this)}
          changeInputSubCategoryItem={this.props.changeInputSubCategoryItem.bind(this)}
          submitSubCategoryInput={this.props.submitSubCategoryInput.bind(this)}
          toggleShowSubTasks={this.props.toggleShowSubTasks.bind(this)}
          changeSubCategoryText={this.props.changeSubCategoryText.bind(this)}
          deleteSubCategoryItem={this.props.deleteSubCategoryItem.bind(this)}
    		/>
    	</div>
    );
  }
}

export default CategoryArea;

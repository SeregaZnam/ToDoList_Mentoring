import React, { Component } from 'react';
import AddCategoryTitle from '../AddCategoryTitle/AddCategoryTitle';
import CategoryTree from '../CategoryTree/CategoryTree';
import './CategoryArea.css';

class CategoryArea extends Component {
  render() {
    return (
    	<div className="category-area">
    		<AddCategoryTitle />
    		<CategoryTree />
    	</div>
    );
  }
}

export default CategoryArea;

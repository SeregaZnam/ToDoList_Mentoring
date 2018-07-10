import React, { Component } from 'react';
import CategoryItem from '../CategoryItem/CategoryItem';
import './CategoryTree.css';

class CategoryTree extends Component {
  render() {
    return (
    	<div className="category-tree">
    		<CategoryItem />
    	</div>
    );
  }
}

export default CategoryTree;

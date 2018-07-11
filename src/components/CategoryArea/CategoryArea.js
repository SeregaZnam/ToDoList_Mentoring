import React, { Component } from 'react';
import AddCategoryTitle from '../AddCategoryTitle/AddCategoryTitle';
import CategoryTree from '../CategoryTree/CategoryTree';
import './CategoryArea.css';

class CategoryArea extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inputValue: '',
			categoryItem: [
				{text: 'Category Test', flagChangeText: false}
			]
		}
	}

	// Change state when entering a value in the input
	handleChangeInput(event) {
		this.setState({ inputValue: event.target.value });
	}

	// Adding a category from the component AddCategoryTitle
	addCategory(event) {
		event.preventDefault();
		this.state.categoryItem.push({ text: this.state.inputValue });
		this.setState({
			inputValue: '',
			categoryItem: this.state.categoryItem
		});
	}

	// Deleting category item
	deleteCategoryItem(index) {
		this.state.categoryItem.splice(index, 1);
		this.setState({ categoryItem: this.state.categoryItem });
	}

	// Change category text
	changeCategoryText(index) {
		this.state.categoryItem[index].flagChangeText = !this.state.categoryItem[index].flagChangeText;
		this.setState({ categoryItem: this.state.categoryItem });
	}

	submitCategoryInput(event) {
		event.preventDefault();

		// ...
	}

	// Changing text in a state when typing
	changeInputCategoryItem(event) {
		let index = event.target.getAttribute('data-index');

		this.state.categoryItem[index].text = event.target.value;
		this.setState({ categoryItem: this.state.categoryItem });
	}

  render() {
  	// Skip data to output a category in CategotyTree
  	let categoryItems = this.state.categoryItem.map((item, index) => {
  		return item;
  	});

    return (
    	<div className="category-area">
    		<AddCategoryTitle 
    			inputValue={this.state.inputValue}
    			addCategory={this.addCategory.bind(this)}
    			handleChangeInput={this.handleChangeInput.bind(this)}
    		/>
    		<CategoryTree 
    			categoryItems={categoryItems} 
    			deleteCategoryItem={this.deleteCategoryItem.bind(this)}
    			changeCategoryText={this.changeCategoryText.bind(this)}
    			submitCategoryInput={this.submitCategoryInput.bind(this)}
    			changeInputCategoryItem={this.changeInputCategoryItem.bind(this)}
    		/>
    	</div>
    );
  }
}

export default CategoryArea;

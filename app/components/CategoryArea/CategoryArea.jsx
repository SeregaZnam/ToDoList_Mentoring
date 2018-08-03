import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCategoryItemRedux } from '../../actions/index';
import AddCategoryTitle from '../AddCategoryTitle/AddCategoryTitle.jsx';
import CategoryTree from '../CategoryTree/CategoryTree.jsx';
import './CategoryArea.css';

class CategoryArea extends Component {
  static propTypes = {
    inputValueRedux: PropTypes.string,
    addCategoryItemRedux: PropTypes.func.isRequired
  };
  
  addCategory(event) {
    const { inputValueRedux, categoryItemsRedux } = this.props;
    let maxIdCategory = 0,
      maxLevelCategory,
      formControl      = event.target,
      inputSearch        = formControl.querySelector('input'),
      newCategoryItem;

    event.preventDefault();

    if (inputSearch.value) {
      inputSearch.style.backgroundColor = 'white';

      maxLevelCategory = categoryItemsRedux.map((item) => {
        if (maxIdCategory < item.id) {
          maxIdCategory = item.id;
        }
        return item.levelCategory[0];
      });
      
      if (maxLevelCategory.length == 0) {
        maxLevelCategory = 1;
      } else {
        maxLevelCategory = Math.max(...maxLevelCategory) + 1;
      }

      newCategoryItem = { 
        id: maxIdCategory + 1,
        parentId: 0,
        text: inputValueRedux, 
        checkedCategory: false,
        flagChangeText: false,
        levelCategory: [maxLevelCategory],
        taskList: []
      };

      this.props.addCategoryItemRedux(newCategoryItem); 

    } else {
      formControl.classList.add('error');

      setTimeout(() => {
        formControl.classList.remove('error');
      }, 3000);
    }
  }

  render() {
    return <div className="category-area">
      <AddCategoryTitle 
        addCategory={(event)=>{
          this.addCategory(event);
        }}
      />
      <CategoryTree />
    </div>;
  }
};

const mapStateToProps = (state) => {
  return {
    inputValueRedux: state.categoryTitle.inputValueRedux,
    categoryItemsRedux: state.categoryTitle.categoryItemsRedux
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    addCategoryItemRedux: bindActionCreators(addCategoryItemRedux, dispatch)
  };
}

export default connect(mapStateToProps, mapActionsToProps)(CategoryArea);
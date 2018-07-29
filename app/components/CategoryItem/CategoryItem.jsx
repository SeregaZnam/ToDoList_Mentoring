import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeCategoryTextRedux, submitCategoryInputRedux, changeInputCategoryItemRedux } from '../../actions/index';
import ImageComponent from '../ImageComponent/ImageComponent.jsx';
import { imageSrcEditCategory, imageSrcCategoryDelete, imageSrcCategoryAdd } from '../ImageComponent/srcImage';
import './CategoryItem.css';

class CategoryItem extends Component {
    constructor(props) {
        super(props);
        // При присваивании функций с bind ломается фильтрация
        // this.deleteCategoryItem = this.props.deleteCategoryItem.bind(null, this.props.item.levelCategory, this.props.index);
        // this.addSubCategoryItem = this.props.addSubCategoryItem.bind(null, this.props.item.levelCategory, this.props.item.id, this.props.index);
        // this.toggleShowTasks    = this.props.toggleShowTasks.bind(null, this.props.index);
    }

    static propTypes = {
        addSubCategoryItem: PropTypes.func.isRequired,
        changeCategoryTextRedux: PropTypes.func.isRequired,
        changeInputCategoryItemRedux: PropTypes.func.isRequired,
        deleteCategoryItem: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        submitCategoryInputRedux: PropTypes.func.isRequired,
        toggleShowTasks: PropTypes.func.isRequired,
        item: PropTypes.shape({
            checkedCategory: PropTypes.bool.isRequired,
            flagChangeText: PropTypes.bool.isRequired,
            id: PropTypes.number.isRequired,
            parentId: PropTypes.number.isRequired,
            levelCategory: PropTypes.array.isRequired,
            taskList: PropTypes.array,
            text: PropTypes.text
        })
    };

  render() {
    let { item, index, toggleShowTasks, changeCategoryTextRedux, submitCategoryInputRedux, changeInputCategoryItemRedux, deleteCategoryItem, addSubCategoryItem } = this.props;
    let categoryNode,
        styleSubCategory,
        widthSubCategory,
        marginLeftSubCategory,
        itemLevel;

    if (item.flagChangeText) {
        categoryNode = <form 
            className="category-item__form" 
            onSubmit={(event) => {
                let element = event.target.children[0],
                    indexCategory = element.dataset.index,
                    elementValue  = element.value;

                submitCategoryInputRedux(indexCategory, elementValue);
            }}
            >
            <input 
                type="text" 
                className="category-item__form_input" 
                value={item.text}
                data-index={index}
                onChange={(event) => {
                    let element = event.target.children[0],
                        indexCategory = event.target.dataset.index,
                        elementValue  = event.target.value;

                    changeInputCategoryItemRedux(indexCategory, elementValue);
                }}
                />
        </form>;
    } else {
        // For correcting the click processing we create different id
        let idLabel = "category-item__checkbox--label-" + index;

        categoryNode = <span>
            <input 
                type="checkbox"
                id={idLabel}
                className="category-item__checkbox"
                onChange={toggleShowTasks.bind(null, index)}
            />
            <label htmlFor={idLabel} className="category-item__text">
                {item.text}
            </label>
        </span>;
    }

    // Category alignment
    itemLevel = item.levelCategory;
    for (let i = 0; i < item.levelCategory.length; i++) {
     if (itemLevel[i] == 0) {
         delete itemLevel[i];
     }
    }
    // item.join('').split('') deleting empty from an array
    itemLevel = itemLevel.join('').split('');

    if (itemLevel.length > 1) {
        widthSubCategory = 100 - Number(itemLevel.length) * 5 + '%';
        marginLeftSubCategory = 100 - parseInt(widthSubCategory) + '%';

        styleSubCategory = {
            width: widthSubCategory, 
            marginLeft: marginLeftSubCategory
        };
    }
    
    return (
    	<div className="category-item" style={styleSubCategory}>
    		<div className="category-item__left">
                {categoryNode}
                <ImageComponent 
                    attributeClassName="category-item__editing"
                    srcImage={imageSrcEditCategory}
                    funcOnClick={() => {
                        changeCategoryTextRedux(index)
                    }}
                />
    		</div>
    		<div className="category-item__right">
                <ImageComponent 
                    attributeClassName="category-item__delete"
                    srcImage={imageSrcCategoryDelete}
                    funcOnClick={deleteCategoryItem.bind(null, item.levelCategory, index)}
                />
                <ImageComponent 
                    attributeClassName="category-item__add"
                    srcImage={imageSrcCategoryAdd}
                    funcOnClick={addSubCategoryItem.bind(null, item.levelCategory, item.id, index)}
                />
    		</div>
    	</div>
    );
  }
}

const mapStateToProps = (state) => {
    return {};
}

const mapActionsToProps = (dispatch) => {
    return {
        changeCategoryTextRedux: bindActionCreators(changeCategoryTextRedux, dispatch),
        submitCategoryInputRedux: bindActionCreators(submitCategoryInputRedux, dispatch),
        changeInputCategoryItemRedux: bindActionCreators(changeInputCategoryItemRedux, dispatch)
    };
}

export default connect(mapStateToProps, mapActionsToProps)(CategoryItem);
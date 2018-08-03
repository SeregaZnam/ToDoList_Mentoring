import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeCategoryTextRedux, deleteCategoryItemRedux, addSubCategoryItemRedux } from '../../actions/index';
import ChangeItemCategoryForm from '../ChangeItemCategoryForm/ChangeItemCategoryForm.jsx';
import ChangeItemCategoryNode from '../ChangeItemCategoryNode/ChangeItemCategoryNode.jsx';
import ImageComponent from '../ImageComponent/ImageComponent.jsx';
import { imageSrcEditCategory, imageSrcCategoryDelete, imageSrcCategoryAdd } from '../ImageComponent/srcImage';
import './CategoryItem.css';

class CategoryItem extends Component {
    static propTypes = {
        changeCategoryTextRedux: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
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

    deleteCategoryItem(levelCategory, index) {
        const { categoryItemsRedux, deleteCategoryItemRedux } = this.props;
        let indices = [];

        for (let i = 0; i < categoryItemsRedux.length; i++) {
            if (categoryItemsRedux[i].levelCategory.join('').indexOf(levelCategory.join('')) == 0) {
                indices.push(i);
            }
        }

        deleteCategoryItemRedux(index, indices.length);
    }

    addSubCategoryItem(levelCategory, parentId, index) {
        const { categoryItemsRedux, addSubCategoryItemRedux } = this.props;
        let lengthNextLevel = levelCategory.length + 1,
            lastNumberLevel = 0,
            newNumberLevel  = [],
            maxIdCategory = 0,
            newSubCategoryItem;

        // Generation of a level number
        categoryItemsRedux.forEach((item) => {
            if (maxIdCategory < item.id) {
                maxIdCategory = item.id;
            }

            if (item.levelCategory.length == lengthNextLevel && levelCategory != item.levelCategory) {
                lastNumberLevel < item.levelCategory[item.levelCategory.length - 1] ?
                    lastNumberLevel = item.levelCategory[item.levelCategory.length - 1] : 
                    lastNumberLevel;
            }
        });

        for (var i = 0; i < levelCategory.length; i++) {
            newNumberLevel.push(levelCategory[i]);
        }

        lastNumberLevel++;
        newNumberLevel.push(lastNumberLevel);

        // Sorting category
        for (let j = 0; j < categoryItemsRedux.length; j++) {
            if (categoryItemsRedux[j].levelCategory.join('').indexOf(levelCategory.join('')) == 0 && 
                levelCategory != categoryItemsRedux[j].levelCategory
            ) {
                index = j;
            }
        }

        newSubCategoryItem = {
            id: maxIdCategory + 1,
            parentId: parentId,
            text: '',
            checkedCategory: false,
            flagChangeText: true,
            levelCategory: newNumberLevel,
            taskList: []
        };

        addSubCategoryItemRedux(index, newSubCategoryItem);
    }

  render() {
    let { item, index, changeCategoryTextRedux } = this.props;
    let categoryNode,
        styleSubCategory,
        widthSubCategory,
        marginLeftSubCategory,
        itemLevel;

    if (item.flagChangeText) {
        categoryNode = <ChangeItemCategoryForm 
            item={item} 
            index={index}
        />;
    } else {
        categoryNode = <ChangeItemCategoryNode 
            item={item} 
            index={index}
        />;
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
                    funcOnClick={() => {
                        this.deleteCategoryItem(item.levelCategory, index);
                    }}
                />
                <ImageComponent 
                    attributeClassName="category-item__add"
                    srcImage={imageSrcCategoryAdd}
                    funcOnClick={() => {
                        this.addSubCategoryItem(item.levelCategory, item.id, index);
                    }}
                />
    		</div>
    	</div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        categoryItemsRedux: state.categoryTitle.categoryItemsRedux
    };
}

const mapActionsToProps = (dispatch) => {
    return {
        changeCategoryTextRedux: bindActionCreators(changeCategoryTextRedux, dispatch),
        deleteCategoryItemRedux: bindActionCreators(deleteCategoryItemRedux, dispatch),
        addSubCategoryItemRedux: bindActionCreators(addSubCategoryItemRedux, dispatch)

    };
}

export default connect(mapStateToProps, mapActionsToProps)(CategoryItem);
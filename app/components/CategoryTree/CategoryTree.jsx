import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generationLevelCategoryRedux, filterCategoryItemsRedux } from '../../actions/index';
import CategoryItem from '../CategoryItem/CategoryItem.jsx';
import './CategoryTree.css';

class CategoryTree extends Component {
    constructor(props) {
        super(props);
        this.generationLevelCategory();
        this.filterCategoryItems();
    }

    static propTypes = {
        categoryItemsRedux: PropTypes.array
    };

    generationLevelCategory() {
        const { categoryItemsRedux, generationLevelCategoryRedux } = this.props;
        let i = 1,
            filterCategoryItems = [],
            newCategoryItems = [];

        categoryItemsRedux.forEach(item => {
            item.levelCategory = [];
        })

        filterCategoryItems = categoryItemsRedux.slice();

        filterCategoryItems = categoryItemsRedux.map(item => {
            return item.id;
        })

        filterCategoryItems = filterCategoryItems.sort((a, b) => a - b);

        filterCategoryItems.forEach(item => {
            categoryItemsRedux.forEach(categoryItem => {
                if (item == categoryItem.id) {
                    newCategoryItems.push(categoryItem);
                }
            })
        })

        newCategoryItems.forEach(item => {
            if (item.parentId == 0) {
                item.levelCategory.push(i);
                i++;
                pushLevelCategory(item.id, categoryItemsRedux, item.levelCategory);
            }
        })

        generationLevelCategoryRedux(categoryItemsRedux);

        function pushLevelCategory(id, categoryItemsRedux, levelCategory) {
            let j = 1;
            categoryItemsRedux.forEach(item => {
                if (id == item.parentId) {
                    item.levelCategory = levelCategory.slice();
                    item.levelCategory.push(j);
                    j++;
                    pushLevelCategory(item.id, categoryItemsRedux, item.levelCategory);
                }
            });
        }
    }

    filterCategoryItems() {
        const { categoryItemsRedux, filterCategoryItemsRedux } = this.props;
        let maxLength = 0,
            filterCategoryArray = [],
            filterCategoryItems = [];

        filterCategoryArray = categoryItemsRedux.slice();

        filterCategoryArray = filterCategoryArray.map(item => {
            if (item.levelCategory.length > maxLength) { 
                maxLength = item.levelCategory.length;
            }
            return item.levelCategory;
        });
        
        filterCategoryArray = filterCategoryArray.map(item => {
            for (let i = 0; i < maxLength; i++) {
                if (item[i] == undefined) item[i] = 0;
            }
            return item.join('');
        });

        filterCategoryArray = filterCategoryArray.sort((a, b) => a - b);

        filterCategoryArray = filterCategoryArray.map(item => {
            item = item.split('');
            return item;
        });

        filterCategoryArray.forEach(item => {
            categoryItemsRedux.forEach(elem => {
                if (elem.levelCategory.toString() == item.toString()) {
                    filterCategoryItems.push(elem);
                }
            });
        });

        filterCategoryItemsRedux(filterCategoryItems);
    }

    render () {
        const { categoryItemsRedux } = this.props;
        const categoryItemNodes = categoryItemsRedux.map((item, index) => {
            return <div key={index}>
                <CategoryItem 
                    index={index}
                    item={item}
                />
            </div>
        });

        return <div className="category-tree">
            {categoryItemNodes}
        </div>;
    }
};

const mapStateToProps = (state) => {
    return {
        categoryItemsRedux: state.categoryTitle.categoryItemsRedux
    }
}

const mapActionsToProps = (dispatch) => {
    return {
        generationLevelCategoryRedux: bindActionCreators(generationLevelCategoryRedux, dispatch),
        filterCategoryItemsRedux: bindActionCreators(filterCategoryItemsRedux, dispatch)
    };
}

export default connect(mapStateToProps, mapActionsToProps)(CategoryTree);
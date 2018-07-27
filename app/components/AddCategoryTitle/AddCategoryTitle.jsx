import React from 'react';
import PropTypes from 'prop-types';
import WriteNoteInput from '../WriteNoteInput/WriteNoteInput.jsx';
import './AddCategoryTitle.css';

const AddCategoryTitle = ({ addCategory }) => {
  let flagAddCategory = true;

  return <div className="add-category-title">
    <WriteNoteInput 
      addNote={addCategory}
      flagAddCategory={flagAddCategory}
    />
  </div>;
};

AddCategoryTitle.propTypes = {
	addCategory: PropTypes.func.isRequired
};

export default AddCategoryTitle;
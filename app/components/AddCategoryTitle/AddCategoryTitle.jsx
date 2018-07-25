import React from 'react';
import PropTypes from 'prop-types';
import WriteNoteInput from '../WriteNoteInput/WriteNoteInput.jsx';
import './AddCategoryTitle.css';

const AddCategoryTitle = ({ inputValue, addCategory, handleChangeInput }) => {
  let flagAddCategory = true;

  return <div className="add-category-title">
    <WriteNoteInput 
      inputValue={inputValue}
      addNote={addCategory}
      flagAddCategory={flagAddCategory}
      // handleChangeInput={handleChangeInput}
    />
  </div>;
};

AddCategoryTitle.propTypes = {
	inputValue: PropTypes.string,
	addCategory: PropTypes.func.isRequired,
	// handleChangeInput: PropTypes.func.isRequired
};

export default AddCategoryTitle;
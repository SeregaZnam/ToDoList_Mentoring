import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ImageComponent.css';

const ImageComponent = ({ attributeClassName, funcOnClick, srcImage }) => {
	return <input 
      className={attributeClassName} 
      onClick={funcOnClick} 
      type="image" 
      src={srcImage} 
    />;
}

ImageComponent.propTypes = {
	attributeClassName: PropTypes.string,
	funcOnClick: PropTypes.func.isRequired,
	srcImage: PropTypes.string.isRequired
}

export default ImageComponent;
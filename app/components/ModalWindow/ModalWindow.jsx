import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleModalCloseRedux, saveModalInfoRedux, changeTextModalTaskRedux, changeCheckboxDoneModalRedux, changeValueSelectModalRedux } from '../../actions/index';
import { Modal, Button, FormControl, FormGroup } from 'react-bootstrap';
import './ModalWindow.css';

class ModalWindow extends Component {
  render() {
    let { textModalTaskRedux, isDoneModalRedux, indexModalTaskRedux, indexModalCategoryRedux, taskModalSelectedRedux, showModalRedux, categoryItemsRedux, handleModalCloseRedux, saveModalInfoRedux, changeTextModalTaskRedux, changeCheckboxDoneModalRedux, changeValueSelectModalRedux } = this.props;
  	let defaultValueSelect,
  		  optionsValue;
  	
  	optionsValue = categoryItemsRedux.map((item, index) => {
  		return <option key={index} value={index} data-index={index}>
  			{item.text}
  		</option>;
  	});

  	if (showModalRedux) {
  		defaultValueSelect = taskModalSelectedRedux;
  	}

    return (
      <div className="modal-window">
        <Modal show={showModalRedux} onHide={() => { handleModalCloseRedux(); }}>
          <Modal.Header closeButton>
            <Modal.Title>Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          	<FormControl
	            type="text"
	            value={textModalTaskRedux}
	            placeholder="Enter text"
	            onChange={(event) => {
                changeTextModalTaskRedux(event.target.value);
              }}
	        />
	        <div className="modal-window__done">
	      		<input 
	      			type="checkbox" 
	      			id="modal-window__checkbox--label"
	      			className="modal-window__checkbox"
	      			checked={isDoneModalRedux}
              onChange={() => {
                changeCheckboxDoneModalRedux();
              }}
	      		/>
	      		<label htmlFor="modal-window__checkbox--label">Is done</label>
      		</div>
      		<FormGroup controlId="formControlsSelect">
		      <FormControl 
		      	componentClass="select"
		      	defaultValue={defaultValueSelect}
		      	data-indexcategory={indexModalCategoryRedux}
		      	data-indextask={indexModalTaskRedux}
		      	onChange={(event) => {
              let indexCategory = event.target.dataset.indexcategory,
                  indexTask     = event.target.dataset.indexTask,
                  eventValue    = event.target.value;
              changeValueSelectModalRedux(indexCategory, indexTask, eventValue);
            }}
		      >
		      	{optionsValue}
		      </FormControl>
		    </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button 
	            className="data-indices" 
	            onClick={() => {
                saveModalInfoRedux(textModalTaskRedux, isDoneModalRedux)
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ModalWindow.propTypes = {
  categoryItemsRedux: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string
    })
  ),
  changeCheckboxDoneModalRedux: PropTypes.func.isRequired,
  changeTextModalTaskRedux: PropTypes.func.isRequired,
  changeValueSelectModalRedux: PropTypes.func.isRequired,
  handleModalCloseRedux: PropTypes.func.isRequired,
  indexModalCategoryRedux: PropTypes.string,
  indexModalTaskRedux: PropTypes.string,
  isDoneModalRedux: PropTypes.bool,
  saveModalInfoRedux: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  taskModalSelected: PropTypes.any,
  textModalTaskRedux: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    showModalRedux: state.categoryTitle.showModalRedux,
    categoryItemsRedux: state.categoryTitle.categoryItemsRedux,
    textModalTaskRedux: state.categoryTitle.textModalTaskRedux,
    isDoneModalRedux: state.categoryTitle.isDoneModalRedux,
    indexModalCategoryRedux: state.categoryTitle.indexModalCategoryRedux,
    indexModalTaskRedux: state.categoryTitle.indexModalTaskRedux,
    taskModalSelectedRedux: state.categoryTitle.taskModalSelectedRedux
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    handleModalCloseRedux: bindActionCreators(handleModalCloseRedux, dispatch),
    saveModalInfoRedux: bindActionCreators(saveModalInfoRedux, dispatch),
    changeTextModalTaskRedux: bindActionCreators(changeTextModalTaskRedux, dispatch),
    changeCheckboxDoneModalRedux: bindActionCreators(changeCheckboxDoneModalRedux, dispatch),
    changeValueSelectModalRedux: bindActionCreators(changeValueSelectModalRedux, dispatch)
  };
}

export default connect(mapStateToProps, mapActionsToProps)(ModalWindow);
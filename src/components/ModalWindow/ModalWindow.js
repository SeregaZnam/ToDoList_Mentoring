import React, {Component} from 'react';
import { Modal, Button, FormControl, FormGroup } from 'react-bootstrap';
import './ModalWindow.css';

class ModalWindow extends Component {
  render() {
  	let defaultValueSelect,
  		optionsValue;
  	
  	optionsValue = this.props.categoryItems.map((item, index) => {
  		return <option key={index} value={index} data-index={index}>
  			{item.text}
  		</option>;
  	});

  	if (this.props.showModal) {
  		defaultValueSelect = this.props.taskModalSelected;
  	}

    return (
      <div className="modal-window">
        <Modal show={this.props.showModal} onHide={this.props.handleModalClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          	<FormControl
	            type="text"
	            value={this.props.textModalTask}
	            placeholder="Enter text"
	            onChange={this.props.changeTextModalTask.bind(this)}
	        />
	        <div className="modal-window__done">
	      		<input 
	      			type="checkbox" 
	      			id="modal-window__checkbox--label"
	      			className="modal-window__checkbox"
	      			checked={this.props.isDoneModal}
              		onChange={this.props.changeCheckboxDoneModal.bind(this)}
	      		/>
	      		<label htmlFor="modal-window__checkbox--label">Is done</label>
      		</div>
      		<FormGroup controlId="formControlsSelect">
		      <FormControl 
		      	componentClass="select"
		      	value={defaultValueSelect}
		      	data-indexcategory={this.props.indexModalCategory}
		      	data-indextask={this.props.indexModalTask}
		      	onChange={this.props.changeValueSelectModal.bind(this)}
		      >
		      	{optionsValue}
		      </FormControl>
		    </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button 
	            className="data-indices" 
	            onClick={this.props.saveModalInfo.bind(null, this.props.textModalTask, this.props.isDoneModal)}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalWindow;
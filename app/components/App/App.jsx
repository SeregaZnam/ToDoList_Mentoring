import React, { Component } from 'react';
import CategoryArea from '../CategoryArea/CategoryArea.jsx';
import TasksArea from '../TasksArea/TasksArea.jsx';
import ModalWindow from '../ModalWindow/ModalWindow.jsx';
import './App.css';

class App extends Component {
  render() {
    return (
    	<div className="app-main">
      		<CategoryArea />
      		<TasksArea />
      		<ModalWindow />
      	</div>
    );
  }
}

export default App;
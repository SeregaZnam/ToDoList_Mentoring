import React, { Component } from 'react';
import CategoryArea from '../CategoryArea/CategoryArea';
import TasksArea from '../TasksArea/TasksArea';
import './App.css';

class App extends Component {
  render() {
    return (
    	<div className="app-main">
      		<CategoryArea />
      		<TasksArea />
      	</div>
    );
  }
}

export default App;

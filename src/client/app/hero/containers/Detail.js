import React, {Component} from 'react';
import ArmorList from './../components/ArmorList';
import BluePrint from './../components/BluePrint';
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

class Detail extends Component{
  render(){
    return (
      <div className="container">
	      <div className="columns">
          <div className="column is-4">
            <ArmorList/>
          </div>
	        <div className="column is-8">
            <BluePrint/>
	        </div>
	      </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Detail);

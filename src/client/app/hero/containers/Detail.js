import React, {Component} from 'react';
import ArmorList from './../components/ArmorList';
import BluePrint from './../components/BluePrint';

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

export default Detail;

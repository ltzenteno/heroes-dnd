import React, {Component} from 'react';
import {connect} from 'react-redux';
import ArmorList from './../components/ArmorList';
import BluePrint from './../components/BluePrint';
import {
  assembleArmor,
  resetArmor
} from './../actions';
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import AssembledBody from './../components/AssembledBody';

class Detail extends Component{

  renderBluePrint = () => {
    return(
      <div>
        <div className="columns">
          <div className="column is-4">
            <ArmorList/>
          </div>
          <div className="column is-8">
            <BluePrint/>
          </div>
        </div>
        {this.renderActionButton()}
      </div>

    );
  };

  renderAssembled = () => {
    return(
      <div>
        <div className="columns">
          <div className="column is-12">
            <AssembledBody/>
          </div>
        </div>
        <div className="columns">
          <div className="column is-12">
            {this.renderResetButton()}
          </div>
        </div>
      </div>

    );
  };

  renderActionButton = () => {
    return(
      <div className="columns">
        <div className="column is-12">
          <button
            className="button is-success"
            onClick={() => this.props.assembleArmor()}
          >
            Assemble!
          </button>
        </div>
      </div>
    );
  };

  renderResetButton = () => {
    return(
      <div className="columns">
        <div className="column is-12">
          <button
            className="button"
            onClick={() => this.props.resetArmor()}
          >
            Reset&nbsp;<span><i className="fa fa-repeat"/></span>
          </button>
        </div>
      </div>
    );
  };

  render(){
    return (
      <div className="container">
        {(this.props.assembled) ?
          this.renderAssembled()
          :
          this.renderBluePrint()
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return{
    assembleArmor:() => {
      dispatch(assembleArmor());
    },
    resetArmor:() => {
      dispatch(resetArmor());
    }
  };
};

const mapStateToProps = state => {
  const {assembled} = state.megaMan;
  return{
    assembled
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(Detail));

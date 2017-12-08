import React, {Component} from 'react';
import {DropTarget} from 'react-dnd';
import {connect} from 'react-redux';
import {dropArmorItem} from './../hero/actions';
import {ItemTypes} from "./types";

const DropObject = {
  drop(props, monitor){
    props.dropArmorItem(props.name, monitor.getItem());
    return{
      item:monitor.getItem()
    }
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget:connect.dropTarget()
  }
};

class DropSpot extends Component{
  render(){
    const {connectDropTarget} = this.props;
    return connectDropTarget(
      <div>
        {this.props.children}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return{
    dropArmorItem:(key, item) => {
      dispatch(dropArmorItem(key, item));
    }
  };
};

const mapStateToProps = state => {
  const {armor} = state.megaMan;
  return{
    armor
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget(ItemTypes.MEGA_MAN_ARMOR, DropObject, collect)(DropSpot));

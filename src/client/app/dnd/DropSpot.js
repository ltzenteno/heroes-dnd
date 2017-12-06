import React, {Component} from 'react';
import {DropTarget} from 'react-dnd';
import {ItemTypes} from "./types";

const DropObject = {
  drop(props, monitor){
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
    return(
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default DropTarget(ItemTypes.MEGA_MAN_ARMOR, DropObject, collect)(DropSpot);

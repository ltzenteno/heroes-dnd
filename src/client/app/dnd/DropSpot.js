import React, {Component} from 'react';
import {DropTarget} from 'react-dnd';
import {ItemTypes} from "./types";

const DropObject = {
  drop(props, monitor){
    console.log('element dropped: ', monitor.getItem());
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
    console.log('DropSpot props: ', this.props);
    return connectDropTarget(
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default DropTarget(ItemTypes.MEGA_MAN_ARMOR, DropObject, collect)(DropSpot);

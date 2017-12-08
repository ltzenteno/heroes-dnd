import React, {Component} from 'react';
import { DragSource } from 'react-dnd';
import {ItemTypes} from './../dnd/types';

const DragObject = {
  beginDrag(props) {
    return{
      ...props.children.props
    }
  },
  endDrag(props, monitor, component){
    if(!monitor.didDrop())
      return;

    const elem = monitor.getDropResult();
  }
};

const collect = (connect, monitor) => {
  return{
    connectDragSource:connect.dragSource(),
    isDragging:monitor.isDragging()
  };
};

class ListItemDragSource extends Component{
  render(){
    const {connectDragSource} = this.props;
    return connectDragSource(
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default DragSource(ItemTypes.MEGA_MAN_ARMOR, DragObject, collect)(ListItemDragSource);

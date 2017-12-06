import React, {Component} from 'react';
import { DragSource } from 'react-dnd';
import {ItemTypes} from './../dnd/types';

const DragObject = {
  beginDrag(props) {
    console.log('beginDrag props; ', props)
  },
  endDrag(props, monitor, component){
    if(!monitor.didDrop())
      return;

    const elem = monitor.getDropResult();
    console.log('element dropped: ', elem);
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
    return(
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default DragSource(ItemTypes.MEGA_MAN_ARMOR, DragObject, collect)(ListItemDragSource);

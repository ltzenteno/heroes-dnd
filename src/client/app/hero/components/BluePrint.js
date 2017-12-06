import React, {Component} from 'react';
import blueprint from './../../images/megaman_blueprint.png';
import DropSpot from './../../dnd/DropSpot';

class BluePrint extends Component{
  render(){
    return (
      <div style={styles.containerStyle}>
       <DropSpot>
         BOX 1
       </DropSpot>
      </div>
    );
  }
}

const styles = {
  containerStyle:{
    backgroundImage:`url(${blueprint})`,
    minHeight:1101,
    width:726
  }
};


export default BluePrint;

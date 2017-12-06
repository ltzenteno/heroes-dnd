import React, {Component} from 'react';
import blueprint from './../../images/megaman_blueprint.png';

class BluePrint extends Component{
  render(){
    return (
      <div style={styles.containerStyle}>
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

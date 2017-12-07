import React, {Component} from 'react';
import blueprint from './../../images/megaman_blueprint.png';
import DropSpot from './../../dnd/DropSpot';

class BluePrint extends Component{
  render(){
    return (
      <div style={styles.containerStyle}>
        <div style={styles.headTarget}>
          <DropSpot>
            <div style={{width:styles.headTarget.width, height:styles.headTarget.height}} />
          </DropSpot>
        </div>
        <div style={styles.torsoTarget}>
          <DropSpot>
            <div style={{width:styles.torsoTarget.width, height:styles.torsoTarget.height}}/>
          </DropSpot>
        </div>
        <div style={styles.rightArmTarget}>
          <DropSpot>
            <div style={{width:styles.rightArmTarget.width, height:styles.rightArmTarget.height}}/>
          </DropSpot>
        </div>
        <div style={styles.leftArmTarget}>
          <DropSpot>
            <div style={{width:styles.leftArmTarget.width, height:styles.leftArmTarget.height}}/>
          </DropSpot>
        </div>
        <div style={styles.rightLegTarget}>
          <DropSpot>
            <div style={{width:styles.rightLegTarget.width, height:styles.rightLegTarget.height}}/>
          </DropSpot>
        </div>
        <div style={styles.leftLegTarget}>
          <DropSpot>
            <div style={{width:styles.leftLegTarget.width, height:styles.leftLegTarget.height}}/>
          </DropSpot>
        </div>
      </div>
    );
  }
}

const styles = {
  containerStyle:{
    backgroundImage:`url(${blueprint})`,
    minHeight:1101,
    width:726,
    position:'fixed'
  },
  headTarget:{
    backgroundColor:'rgba(255,0,0,0.2)',
    width:100,
    height:100,
    marginTop:303,
    marginLeft:298
  },
  torsoTarget:{
    backgroundColor:'rgba(255,0,0,0.2)',
    width:100,
    height:270,
    marginTop:43,
    marginLeft:298
  },
  rightArmTarget:{
    backgroundColor:'rgba(255,0,0,0.2)',
    width:100,
    height:200,
    marginTop:-150,
    marginLeft:178
  },
  leftArmTarget:{
    backgroundColor:'rgba(255,0,0,0.2)',
    width:100,
    height:200,
    marginTop:-205,
    marginLeft:418
  },
  rightLegTarget:{
    backgroundColor:'rgba(255,0,0,0.2)',
    width:100,
    height:200,
    marginTop:30,
    marginLeft:228
  },
  leftLegTarget:{
    backgroundColor:'rgba(255,0,0,0.2)',
    width:100,
    height:200,
    marginTop:-200,
    marginLeft:358
  }
};


export default BluePrint;

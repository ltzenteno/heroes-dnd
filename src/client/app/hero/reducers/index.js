
const defaultState = {
  armor:{
    head:{},
    torso:{},
    rightArm:{},
    leftArm:{},
    rightLeg:{},
    leftLeg:{}
  }
};

export default (state = defaultState, action) => {
 switch(action.type) {
   default:
     return state;
 }
};

import {
  DROP_ARMOR_ITEM,
  ASSEMBLE_ARMOR
} from './../actions/types';
const defaultState = {
  armor:{
    head:{},
    torso:{},
    rightArm:{},
    leftArm:{},
    rightLeg:{},
    leftLeg:{}
  },
  assembled:false
};

export default (state = defaultState, action) => {
 switch(action.type) {
   case DROP_ARMOR_ITEM:
     return dropArmorItem(state, action.payload);
   case ASSEMBLE_ARMOR:
     return assembleArmor(state);
   default:
     return state;
 }
};

const dropArmorItem = (state, payload) => {
  // validate that key does exist in our current state hierarchy
  if(!state.armor.hasOwnProperty(payload.key)) return state;
  return{
    ...state,
    armor:{
      ...state.armor,
      [payload.key]:payload.item
    }
  };
};

const assembleArmor = state => {
  let assembled = true;
  for(const obj in state.armor){
    // TODO validate that obj === state.armor[obj].id
    if(!(state.armor.hasOwnProperty(obj) && obj === state.armor[obj].id)){
      assembled = false;
      break;
    }
  }
  return {
    ...state,
    assembled
  };
};

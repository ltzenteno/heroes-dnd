import {
  DROP_ARMOR_ITEM
} from './../actions/types';
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
   case DROP_ARMOR_ITEM:
     return dropArmorItem(state, action.payload);
   default:
     return state;
 }
};

const dropArmorItem = (state, payload) => {
  // validate that key does exist in our current state hierarchy
  if(!state.armor.hasOwnProperty(payload.key)) return state;
  // validate that the piece of armor dropped corresponds to the drop target for that piece
  if(payload.key !== payload.item.id) return state;
  return{
    ...state,
    armor:{
      ...state.armor,
      [payload.key]:payload.item
    }
  };
};

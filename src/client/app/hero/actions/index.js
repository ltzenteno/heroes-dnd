import {
  DROP_ARMOR_ITEM,
  ASSEMBLE_ARMOR,
  RESET_ARMOR
} from './types';

export const dropArmorItem = (key, item) => {
  const payload = {
    key,
    item
  };
  return{
    type:DROP_ARMOR_ITEM,
    payload
  };
};

export const assembleArmor = () => {
  return{
    type:ASSEMBLE_ARMOR
  };
};

export const resetArmor = () => {
  return{
    type:RESET_ARMOR
  };
};

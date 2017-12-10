import {
  DROP_ARMOR_ITEM,
  ASSEMBLE_ARMOR
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

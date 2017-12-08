import { DROP_ARMOR_ITEM } from './types';

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

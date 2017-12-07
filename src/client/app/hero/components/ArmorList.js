import React from 'react';
import ArmorItem from './ArmorItem';
import ListItemDragSource from './../../dnd/ListItemDragSource';
import head from './../../images/head.png'
import torso from './../../images/torso.png';
import leftArm from './../../images/left_arm.png';
import rightArm from './../../images/right_arm.png';
import leftLeg from './../../images/left_leg.png';
import rightLeg from './../../images/right_leg.png';

const ArmorList = () => {

  // TODO for now we hardcode the list of armors
  const items = [
    {
      name:'Head',
      image:head,
      type:'mega man'
    },
    {
      name:'Torso',
      image:torso,
      type:'mega man'
    },
    {
      name:'Left Arm',
      image:leftArm,
      type:'mega man'
    },
    {
      name:'Right Arm',
      image:rightArm,
      type:'mega man'
    },
    {
      name:'Left Leg',
      image:leftLeg,
      type:'mega man'
    },
    {
      name:'Right Leg',
      image:rightLeg,
      type:'mega man'
    }
  ];
  const renderItems = () => {
    return items.map((item, index) => {
      return (
        <ListItemDragSource
          key={index}
        >
          <ArmorItem
            name={item.name}
            image={item.image}
            type={item.type}
          />
        </ListItemDragSource>
      );
    });
  };

  return(
    <div>
      {renderItems()}
    </div>
  );
};

export default ArmorList;

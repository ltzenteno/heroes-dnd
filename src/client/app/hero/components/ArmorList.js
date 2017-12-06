import React from 'react';
import ArmorItem from './ArmorItem';
import img1 from './../../images/armor_1.png'
import img2 from './../../images/armor_2.png';
import img3 from './../../images/armor_3.png';
import img4 from './../../images/armor_4.png';

const ArmorList = () => {

  // TODO for now we hardcode the list of armors
  const items = [
    {
      name:'armor 1',
      image:img1,
      type:'defense'
    },
    {
      name:'armor 2',
      image:img2,
      type:'attack'
    },
    {
      name:'armor 3',
      image:img3,
      type:'heal'
    },
    {
      name:'armor 4',
      image:img4,
      type:'defense'
    }
  ];
  const renderItems = () => {
    return items.map((item, index) => {
      return <ArmorItem
        key={index}
        name={item.name}
        image={item.image}
        type={item.type}
      />;
    });
  };

  return(
    <div>
      {renderItems()}
    </div>
  );
};

export default ArmorList;

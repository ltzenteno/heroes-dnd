import React from 'react';

const ArmorItem = ({image, name, type}) => {

  return(
    <div className="box">
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img src={image} alt="armor" />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{name}</strong>
              <br />
              {type}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArmorItem;

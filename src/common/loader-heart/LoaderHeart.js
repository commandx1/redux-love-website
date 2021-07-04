import React from 'react';
import './loader-heart.scss';

const LoaderHeart = () => {
  return (
    <div className='loader-wrapper'>
      <div className='lds-heart'>
        <div></div>
      </div>
    </div>
  );
};

export default LoaderHeart;

import React from 'react';

const HStack = ({ children, className = '', style }) => {
  return (
    <div className={'hstack ' + className} style={style}>
      {children}
    </div>
  );
};

export default HStack;

import React from 'react';
import './index.css';

const BasicLayout: React.FC = props => {
  return (
    <div className='body'>
      {props.children}
    </div>
  );
};

export default BasicLayout;

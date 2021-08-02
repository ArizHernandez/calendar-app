import React from 'react';
import './addNewFab.css';

export const AddNewFab = ({
  color,
  icon,
  action,
  position
}) => {
  return (
    <button 
      className={`btn btn-${color} fab fab-${position}`}
      onClick={action}
    >
      <i className={`fas ${icon}`}></i>
    </button>
  )
}

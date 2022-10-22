import React from 'react';
import "./Canvas.css";
import iconMinus from './icons/icon-minus.png';
import iconPlus from './icons/icon-plus.png';
import iconCursor from './icons/icon-navigation.png';
import iconTrash from './icons/icon-trash.png';
import elementHex from './icons/Element hex.png';


function IconBox () {
  return (
    <div className="iconBox">
      <div className='iconRow'>
        <img src={iconMinus} alt='minus icon' className='icon'/>
        <img src={iconPlus} alt='plus icon' className='icon'/>  
      </div>
      <div className='iconRow'>
        <img src={iconCursor} alt='cursor icon' className='icon'/>
        <img src={iconTrash} alt='trash icon' className='icon'/>  
      </div>
    </div>
  )
}

function Canvas () {
  return (
    <div className="canvas">
      <IconBox/>
      <div className="grid-canvas">
        Canvas
        <img src={elementHex} alt='hydrogen'/>
      </div>
    </div>
  );
}

export default Canvas;
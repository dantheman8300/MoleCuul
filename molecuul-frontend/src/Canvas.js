import React from 'react';
import "./Canvas.css";
import iconMinus from './icons/icon-minus.png';
import iconPlus from './icons/icon-plus.png';
import iconCursor from './icons/icon-navigation.png';
import iconTrash from './icons/icon-trash.png';
import elementHex from './icons/Element hex.png';


function IconBox () {

  const handleZoomOut = event => {
    console.log(`zooming out`)
  }

  const handleZoomIn = event => {
    console.log(`zooming in`)
  }

  const handleTrash = event => {
    console.log('trash')
  }

  const handleCursor = event => {
    console.log('cursor')
  }

  return (
    <div className="iconBox">
      <div className='iconRow'>
        <img src={iconMinus} alt='minus icon' className='icon' onClick={handleZoomOut}/>
        <img src={iconPlus} alt='plus icon' className='icon' onClick={handleZoomIn}/>  
      </div>
      <div className='iconRow'>
        <img src={iconCursor} alt='cursor icon' className='icon' onClick={handleCursor}/>
        <img src={iconTrash} alt='trash icon' className='icon' onClick={handleTrash}/>  
      </div>
    </div>
  )
}

function Canvas () {
  return (
    <div className="canvas">
      <IconBox/>
      <div >
        <img src={elementHex} alt='hydrogen' className='molecule'/>
      </div>
    </div>
  );
}

export default Canvas;
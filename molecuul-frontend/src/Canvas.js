import React, {useState} from 'react';
import "./Canvas.css";
import iconMinus from './icons/icon-minus.png';
import iconPlus from './icons/icon-plus.png';
import iconCursor from './icons/icon-navigation.png';
import iconTrash from './icons/icon-trash.png';
import elementHex from './icons/Element hex.png';


function IconBox (props) {

  const handleTrash = event => {
    console.log('trash')
  }

  const handleCursor = event => {
    console.log('cursor')
  }

  return (
    <div className="iconBox">
      <div className='iconRow'>
        <img src={iconMinus} alt='minus icon' className='icon' onClick={props.zoomOutHandler}/>
        <img src={iconPlus} alt='plus icon' className='icon' onClick={props.zoomInHandler}/>  
      </div>
      <div className='iconRow'>
        <img src={iconCursor} alt='cursor icon' className='icon' onClick={handleCursor}/>
        <img src={iconTrash} alt='trash icon' className='icon' onClick={handleTrash}/>  
      </div>
    </div>
  )
}

function MoleculeImage (props) {

  return (
    <img src={elementHex} alt='hydrogen' className='molecule' width={props.scale * 50} height={props.scale * 50}/>
  )
}

function Canvas () {

   const [scale, setScale] = useState(1);

   const handleZoomOut = event => {
    setScale(scale - .2);
    console.log(`zooming out, ${scale}`)
  }

  const handleZoomIn = event => {
    setScale(scale +.2);
    console.log(`zooming in, ${scale}`)
  }


  return (
    <div className="canvas">
      <IconBox zoomInHandler={handleZoomIn} zoomOutHandler={handleZoomOut}/>
      <div >
        <MoleculeImage scale={scale}/>
      </div>
    </div>
  );
}

export default Canvas;
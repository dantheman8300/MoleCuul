import React, {useState} from 'react';
import "./Canvas.css";
import iconMinus from './icons/icon-minus.png';
import iconPlus from './icons/icon-plus.png';
import iconCursor from './icons/icon-navigation.png';
import iconTrash from './icons/icon-trash.png';
import elementHex from './icons/Element hex.png';

var idGen = 0;

// lStructure refers to an array representing the lewis structure and bonds is an array of elements it is bonded with
const Element = (id, name, lStructure, neighbors) => { return {id: id, name: name, lStructure: lStructure, neighbors: neighbors } }

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
   const [elements, setElements] = useState([]);

   const handleZoomOut = event => {
    setScale(scale - .2);
    console.log(`zooming out, ${scale}`)
  }

  const handleZoomIn = event => {
    setScale(scale +.2);
    console.log(`zooming in, ${scale}`)
  }

  /* Removes a single element at specified id from molecule and updates
  * neighboring elements
  */
  function removeElement(id) {
    const newMolecule = elements.map(obj => {
    // Find elements that are neighbors with removed node
        if(obj.neighbors.find(item => item === id) !== undefined) {
      // Remove neighbors association with the node
      obj.neighbors = obj.neighbors.filter((neighbor, i) => { return neighbor !== id });
    }
    // Return any elements that are not the removed node
    if(obj !== id) {
      return obj;
    }
    });

    setElements(newMolecule);
  }


  /* Adds element into molecule model using its name, lewis structure,
  * the element it is bonded to, and the position of that bond.
  * NOTE: Position is indicated by an array index. 0 -> 3 where 
  * 0 is the top position moving clockwise.
  */
  function addElement(elementName, lStructure, bondedElemId, pos) {
      // Creates an empty element
    const element = Element(idGen, elementName, lStructure, [...Array(8)]);
    idGen += 1;

    // Adds neighbor to new element's neighbor list
    element.neighbors[pos] = bondedElemId;

    // Adds new element into molecule list
    setElements([...elements, element]);

    // Finds bondedElemId in current molecule and updates its neighbor list
    const newMolecule = elements.map(obj => {
          if(obj.id === bondedElemId) {
        let newNeighbors = [...obj.neighbors];
        newNeighbors[(pos + 4) % 8] = element.id;
        return {...obj, neighbors: newNeighbors};
      }

      return obj;
      });

    // updates molecule
    setElements(newMolecule);
  }


  return (
    <div className="canvas">
      <IconBox zoomInHandler={handleZoomIn} zoomOutHandler={handleZoomOut}/>
      <div >
        <Molecule scale={scale} elements={elements}/>
      </div>
    </div>
  );
}

function Molecule(props) {


  




  return (
      
  )

}

export default Canvas;
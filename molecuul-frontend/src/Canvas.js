import React, {useState} from 'react';
import "./Canvas.css";
import iconMinus from './icons/icon-minus.png';
import iconPlus from './icons/icon-plus.png';
import iconCursor from './icons/icon-navigation.png';
import iconTrash from './icons/icon-trash.png';
import elementHex from './icons/Element hex.png';
import elementOct from './icons/Element-octagon.png';
import elementUnk from './icons/Element-Unknown.png';

var idGen = 0;

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

function Canvas () {

  const [scale, setScale] = useState(1);
  const [elements, setElements] = useState([]);
  const [mouseX, setMouseX] = useState(500);
  const [mouseY, setMouseY] = useState(200);

  const handleZoomOut = event => {
    setScale(scale - .2);
    console.log(`zooming out, ${scale}`)
  }

  const handleZoomIn = event => {
    setScale(scale +.2);
    console.log(`zooming in, ${scale}`)
  }

  const handleMouseMove = () => {
    var e = window.event;

    var posX = e.clientX;
    var posY = e.clientY;

    setMouseX(posX)
    setMouseY(posY)

    console.log(`(${mouseX}, ${mouseY})`)
  }

  const handleMouseWheel = (event) => {
    console.log(`${event.deltaY}`)

    if(event.deltaY > 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
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
    const element = {
      id: idGen, 
      elementName: elementName, 
      lStructure: lStructure, 
      neighbors: [...Array(8)], 
      parent: bondedElemId
    };

    idGen += 1;

    // Adds neighbor to new element's neighbor list if neighbor exists
    if(element.parent === null) {
      console.log(`Root element!!!!!!!`);
      setElements([element]);
    }
    // Finds bondedElemId in current molecule and updates its neighbor list if bondedElemId exists
    else {
      element.neighbors[pos] = bondedElemId;
      console.log(`Another element in the chain!!!!!!!`);

      const newMolecule = elements.map(obj => {
          if(obj.id === bondedElemId) {
            let newNeighbors = [...obj.neighbors];
            newNeighbors[(pos + 4) % 8] = element.id;
            console.log(`updated neighbor, ${obj.elementName}`)
            return {
              ...obj,
              neighbors: newNeighbors
            };
          }
          return obj;
        });
      // updates molecule
      setElements([...newMolecule, element]);
    }
  }


  return (
    <div 
      className="canvas" 
      onMouseMove={handleMouseMove}
      onWheel={handleMouseWheel}
    >
      <IconBox zoomInHandler={handleZoomIn} zoomOutHandler={handleZoomOut}/>
      <button onClick={() => addElement("Hydrogen-1", [1,0,0,0,0,0,0,0], null, 0)}>Add Element</button>
      <button onClick={() => addElement("Hydrogen-2", [0,0,0,0,1,0,0,1], 0, 4)}>Add Another Element</button>
      <button onClick={() => addElement("Hydrogen-3", [0,0,0,1,0,0,0,0], 1, 3)}>And a third</button>
      <div >
        <Molecule scale={scale} elements={elements} mouseX={mouseX} mouseY={mouseY}/>
      </div>
    </div>
  );
}

function Molecule(props) {

  const [dragX, setDragX] = useState(500);
  const [dragY, setDragY] = useState(500);
  const coord = []

  const handleDrag = (event) => {
    var e = window.event;

    var posX = e.clientX;
    var posY = e.clientY;

    setDragX(posX);
    setDragY(posY);

    console.log(`Drag: (${posX}, ${posY})`)
  }

  const handleDragEnd = (event) => {
    var e = window.event;

    var posX = e.clientX;
    var posY = e.clientY;

    setDragX(posX);
    setDragY(posY);

    console.log(`Drag: (${posX}, ${posY})`)
  }

  function findRelativeCoord(pos, parent, boolAxis) {
    var x = parent.x;
    var y = parent.y;
    switch(pos) {
      case 0:
        x = parent.x;
        y = parent.y - (props.scale * 50);
        break;
      case 1:
        x = parent.x + (Math.sqrt(2)/2)*(props.scale * 50);
        y = parent.y - (Math.sqrt(2)/2)*(props.scale * 50);
        break;
      case 2:
        x = parent.x + (props.scale * 50);
        y = parent.y;
        break;
      case 3:
        x = parent.x + (Math.sqrt(2)/2)*(props.scale * 50);
        y = parent.y + (Math.sqrt(2)/2)*(props.scale * 50);
        break;
      case 4:
        x = parent.x;
        y = parent.y + (props.scale * 50);
        break;
      case 5:
        x = parent.x - (Math.sqrt(2)/2)*(props.scale * 50);
        y = parent.y + (Math.sqrt(2)/2)*(props.scale * 50);
        break;
      case 6:
        x = parent.x - (props.scale * 50);
        y = parent.y;
        break;
      case 7:
        x = parent.x - (Math.sqrt(2)/2)*(props.scale * 50);
        y = parent.y - (Math.sqrt(2)/2)*(props.scale * 50);
        break;
      default:
    }
    if(boolAxis) {
      return x;
    }
    else {
      return y;
    }
  }

  function findRelativePos(parent, id) {
    // Find out if element is root of tree
    let newX = dragX - (props.scale * 50 / 2);
    let newY = dragY - (props.scale * 50 / 2);
    
    if(parent !== undefined) {
      let pos = 0;
      // Finds the relative position of the element in regards to the parent
      for(let i = 0; i < parent.neighbors.length; i++) {
        if(parent.neighbors[i] === id) {
          pos = i;
        }
      }

      newX = findRelativeCoord(pos, coord[parent.id], true);
      newY = findRelativeCoord(pos, coord[parent.id], false);
    }

    coord.push({x: newX, y: newY})
  }  

  const elementDisplay = props.elements.map(({id, elementName, parent, neighbors }) => {
    findRelativePos(props.elements[parent], id);
    console.log(`Element ${elementName} neighbor's list: ${neighbors}`);
    var source = elementOct;
    if(elementName === null) {
      source = elementUnk;
    }
    return <img
        key={id} 
        src={source} 
        alt={elementName}
        draggable
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        width={props.scale * 50} 
        height={props.scale * 50} 
        style={{position: 'absolute', top: coord[id].y, left: coord[id].x}} />
  });

  return (
    elementDisplay
  )

}

export default Canvas;
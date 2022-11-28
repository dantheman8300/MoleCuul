import React, {useState} from 'react';
import "./Canvas.css";
import ElementRender from "./ElementRender";
import OpenElementRender from "./OpenElementRender";
import ErrorBox from "./ErrorBox";
import appleX from './icons/cross-mark_274c.png';
import appleCheck from './icons/check-mark-button_2705.png';
import appleHouse from './icons/house_1f3e0.png';
import appleTrash from './icons/wastebasket_1f5d1-fe0f.png';
import appleMinus from './icons/minus_2796.png';
import applePlus from './icons/plus_2795.png';
import appleQuestion from './icons/question-mark_2753.png';

var idGen = 0;
const POSITIONS = {
  0: 'top', 
  1: 'top right',
  2: 'right',
  3: 'bottom right',
  4: 'bottom',
  5: 'bottom left',
  6: 'left',
  7: 'top left'
}
const NAMES = {
  'H': 'Hydrogen',
  'C': 'Carbon',
  'N': 'Nitrogen',
  'O': 'Oxygen'
}

function IconBox (props) {
  return (
    <div className="iconBox">
      <div className='iconRow'>
        <img src={appleMinus} alt='minus icon' className='icon' onClick={props.zoomOutHandler}/>
        <img src={applePlus} alt='plus icon' className='icon' onClick={props.zoomInHandler}/>  
        <img src={appleHouse} alt='home icon' className='icon' onClick={props.homeHandler}/>
        <img src={appleTrash} alt='trash icon' className='icon' onClick={props.trashHandler}/>  
        <img src={appleQuestion} alt='Search icon' className='icon' onClick={props.structureChecker}/>
        {props.moleculeStatus == 1 && <img src={appleCheck} alt='Check icon' className='icon'/>}
        {props.moleculeStatus == -1 && <img src={appleX} alt='X icon' className='icon' onClick={props.displayErrors}/>}
      </div>
    </div>
  )
}

function Canvas (props) {

  const [scale, setScale] = useState(1);
  const [elements, setElements] = useState({});
  const [mouseX, setMouseX] = useState(500);
  const [mouseY, setMouseY] = useState(200);
  const [center, setCenter] = useState({x: 500, y: 200});
  const [dragStart, setDragStart] = useState({x: 0, y: 0});
  const [moleculeStatus, setMoleculeStatus] = useState(0);
  const [moleculeErrors, setMoleculeErrors] = useState([]);
  const [displayErrors, setDisplayErrors] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(undefined);

  const handleZoomOut = event => {
    setScale(scale - .2);
    console.log(`zooming out, ${scale}`)
  }

  const handleZoomIn = event => {
    setScale(scale +.2);
    console.log(`zooming in, ${scale}`)
  }

  const handleTrash = event => {
    // Remove all elements in the molecule
    setElements({});
    setMoleculeStatus(0);
    setMoleculeErrors([]);
    setDisplayErrors(false);
  }

  const handleHome = event => {
    setCenter({x: 500, y: 200});
  }

  // const handleDragStart = (event) => {
  //   var e = window.event;

  //   var posX = e.clientX;
  //   var posY = e.clientY;

  //   setDragStart({x: posX, y: posY});
  // }

  
  // const handleDragEnd = (event) => {
  //   var e = window.event;

  //   var posX = e.clientX - dragStart.x;
  //   var posY = e.clientY - dragStart.y;

  //   setCenter({x: center.x + posX, y: center.y + posY});
  //   handleDrop();
  // }


  const handleCanvasMove = (event) => {
    setCenter({x: center.x - event.deltaX, y: center.y - event.deltaY});
  }

  const handleDrop = (event) => {
    if(Object.keys(elements).length === 0 && props.selectedElement !== null) {
      var e = window.event;
      setCenter({x: e.clientX - 290, y: e.clientY - 150});
      console.log(`Center at x:${center.x}, y:${center.y}`)
      handleAddElement(undefined, undefined);
      
    }
  }


  /* Removes a single element at specified id from molecule and updates
  * neighboring elements
  */
  function removeElement(id) {

    const newElementDict = elements;

    // Replace the id from the neighbors' neighbor list with null
    for (let i = 0; i < newElementDict[id].neighbors.length; i++) {
      let neighborId = newElementDict[id].neighbors[i];
      if(neighborId !== undefined) {
        for (let j = 0; j < newElementDict[neighborId].neighbors.length; j++) {
          if(newElementDict[neighborId].neighbors[j] === parseInt(id)) {
            newElementDict[neighborId].neighbors[j] = undefined;
          }
        }
      }
    }

    // Remove the element from the molecule
    delete newElementDict[id];

    setElements(newElementDict);
  }


  /* Adds element into molecule model using its name, lewis structure,
  * the element it is bonded to, and the position of that bond.
  * NOTE: Position is indicated by an array index. 0 -> 3 where 
  * 0 is the top position moving clockwise.
  */
  function addElement(elementName, source, lStructure, bondedElemId, pos) {

    // pos = (pos + 4) % 8; 

    // Creates an empty element
    const element = {
      id: idGen, 
      elementName: elementName,
      source: source, 
      lStructure: lStructure, 
      neighbors: [...Array(8)], 
      parent: bondedElemId
    };

    idGen += 1;

    // Creates new element dictionary
    let elemDict = {};

    // Updates element's parent if parent exists
    if(element.parent !== null) {
      element.neighbors[pos] = bondedElemId;

      // Add new element to bond element neighbor list
      Object.entries(elements).map(([key, value]) => {
        if(parseInt(key) === bondedElemId) {
          value.neighbors[(pos + 4) % 8] = element.id;
        }
        elemDict[key] = value;
      });
    }

    // Adds element to new element dictionary
    elemDict[element.id] = element;

    setElements(elemDict);
  }

  const handleAddElement = (bondId, posId) => {
    // Set molecule status to 0 (not checked)
    setMoleculeStatus(0);
    setMoleculeErrors([]); // Clear molecule errors
    setDisplayErrors(false); // Hide error display

    console.log('adding element')
    // display add element params
    console.log(`name: ${props.selectedElement.name}, name: ${props.selectedElement.lStructure}, bondId: ${bondId}, posId: ${posId}`)
    addElement(props.selectedElement.name, props.selectedElement.source, props.selectedElement.lStructure, bondId, (posId + 4) % 8);
  }

  const handleRemoveElement = (id) => {
    // Set molecule status to 0 (not checked)
    setMoleculeStatus(0);
    setMoleculeErrors([]); // Clear molecule errors
    setDisplayErrors(false); // Hide error display

    console.log(`removing element ${id}`)
    removeElement(id);
  }

  const checkStructure = () => {
    console.log('checking structure')
    console.log(elements)

    let errors = [];

    // Iterate through each element in the molecule
    Object.entries(elements).map(([key, element]) => {

      // Iterate through each lStructure in the element and 
      // check if the element has the correct number of neighbors
      for (let pos = 0; pos < element.lStructure.length; pos++) {
        
        const neighbor = element.neighbors[pos];

        if (neighbor === undefined && (element.lStructure[pos] !== 0 || element.lStructure[pos] !== 4)) {
          errors.push({
            errorMessage: 'Missing Bond',
            errorSpecificMessage: `Element, ${NAMES[element.elementName]}, is missing a bond in ${POSITIONS[pos]} position`,
            element: element.elementName,
            id: element.id,
            position: pos
          });
        }

        // I think this is technically impossible but just in case
        if (neighbor !== undefined && (element.lStructure[pos] === 0 || element.lStructure[pos] === 4)) {
          errors.push({
            errorMessage: 'Extra Bond',
            errorSpecificMessage: `Element, ${NAMES[element.elementName]}, has an extra bond in ${POSITIONS[pos]} position`,
            element: element.elementName,
            id: element.id,
            position: pos
          });
        }

        // Check if the lStructure of the neighbor matches the lStructure of the element
        // Note: Check to make sure the error isn't already in the list from the neighbor's side or should it be?
        if (neighbor !== undefined && element.lStructure[pos] !== elements[neighbor].lStructure[(pos + 4) % 8]) {
          errors.push({
            errorMessage: 'Invalid Bond',
            errorSpecificMessage: `Element, ${NAMES[element.elementName]}, has an invalid bond in ${POSITIONS[pos]} position`,
            element: element.elementName,
            id: element.id,
            position: pos
          });
        }
      }
    });

    if (errors.length === 0) {
      setMoleculeStatus(1);
    } else {
      setMoleculeStatus(-1);
      setMoleculeErrors(errors);
    }

    console.log(errors);

  }

  const displayMoleculeErrors = () => {
    if (displayErrors) {
      setDisplayErrors(false);
    } else {
      setDisplayErrors(true);
    }

    console.log(displayErrors);
  }

  const handleHover = (id) => {
    setHoveredElement(id);
  }

  const handleOutHover = () => {
    setHoveredElement(undefined);
  }


  return (
    <div 
      className="canvas" 
      draggable
      onWheel={handleCanvasMove}
      onDragEnd={handleDrop}
      onDrop={
        (e) => {
          console.log(`dropped the element: ${props.selectedElement}`);
          handleDrop();
        }
      }
      onDragOver={
        (e) => {
          e.stopPropagation();
          e.preventDefault();
        }
      }
    >
      <IconBox 
        zoomInHandler={handleZoomIn} zoomOutHandler={handleZoomOut}
        trashHandler={handleTrash} homeHandler={handleHome}
        structureChecker={checkStructure} moleculeStatus={moleculeStatus} 
        moleculeErrors={moleculeErrors} displayErrors={displayMoleculeErrors}
      />
      {displayErrors && <ErrorBox errors={moleculeErrors} elementId={hoveredElement} />}
      <div >
        <Molecule 
          scale={scale} 
          elements={elements} 
          mouseX={mouseX} 
          mouseY={mouseY}
          center={center}
          hover={props.hover}
          handleAddElement={handleAddElement}
          handleRemoveElement={handleRemoveElement}
          handleDragStart={props.handleDragStart} 
          handleDragEnd={props.handleDragEnd}
          handleHover={handleHover}
          handleOutHover={handleOutHover}
        />
      </div>
    </div>
  );
}

function Molecule(props) {
  const [adjustElement, setAdjustElement] = useState(null);
  var coord = {};

  function findRelativeCoord(pos, parent) {
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
    return {x: x, y: y};
  }

  function findRelativePos(parent, id) {
    let point = props.center;
    // Find out if element is child of root
    if(parent !== undefined) {
      let pos;
      // Finds the relative position of the element in regards to the parent
      for(let i = 0; i < parent.neighbors.length; i++) {
        if(parent.neighbors[i] === id) {
          pos = i;
        }
      }
      
      point = findRelativeCoord(pos, coord[parent.id]);
    }
    return point;
  }
  
  const handleDragStart = (elementInfo) => {
    setAdjustElement(elementInfo.id);
    props.handleDragStart(elementInfo);
  }

  const handleDragEnd = (id) => {
    setAdjustElement(null);
    props.handleDragEnd();
    props.handleRemoveElement(id);
  }

  // Draws the current molecule according to the data in canvas
  const elementDisplay = Object.entries(props.elements).map(([key, value]) => {
    if(adjustElement === parseInt(key)) {
      coord[key] = {x: -1000, y: -1000};
    }
    else {
      coord[key] = (findRelativePos(props.elements[value.parent], parseInt(key)));
    }
    return <ElementRender 
      element={value} 
      point={coord[key]}
      scale={props.scale}
      handleDragStart={handleDragStart} 
      handleDragEnd={handleDragEnd}
      handleMouseOver={props.handleHover}
      handleMouseOut={props.handleOutHover}/>
  });


  if(props.hover) {
    // Adds hollow elements showing where elements can be placed
    for(let j = 0; j < Object.entries(props.elements).length; j++) {
      let keys = Object.keys(props.elements);
      for(let k = 0; k < props.elements[keys[j]].lStructure.length; k++) {
        console.log(`Element neighbor ${props.elements[keys[j]].neighbors[k]}`);
        if((props.elements[keys[j]].lStructure[k] > 0) && 
          ((props.elements[keys[j]].neighbors[k] === undefined) ||
          (props.elements[keys[j]].neighbors[k] === adjustElement)) && 
          (parseInt(keys[j]) !== adjustElement)) {
          elementDisplay.push(<OpenElementRender 
            element={props.elements[keys[j]]} 
            point={findRelativeCoord(k, coord[keys[j]])}
            scale={props.scale}
            pos={k}
            handleAddElement={props.handleAddElement} />);
        }
      }
    }
  }
  return (
    elementDisplay
  )

}

export default Canvas;
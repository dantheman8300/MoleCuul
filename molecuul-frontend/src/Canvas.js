import React, {useState, useEffect, useRef} from 'react';
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
import appleQuestion from './icons/icon-gray-check.png';
import appleHorse from './icons/icon-horse.png';
import InstructionTile from './InstructionTile';  
import smileyFace from './icons/smiling-face_263a-fe0f.png';

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
  'O': 'Oxygen',
  'Cl': 'Chlorine'
}



function IconBox (props) {

  return (
    <div>
      <div className="iconBox">
        <div className='iconRow'>
          <InstructionTile handleTutorial={props.handleTutorial}/>
          <img src={appleMinus} alt='minus icon' className='icon' onClick={props.zoomOutHandler}/>
          <img src={applePlus} alt='plus icon' className='icon' onClick={props.zoomInHandler}/>  
          <img src={appleTrash} alt='trash icon' className='icon' onClick={props.trashHandler}/>  
          <img src={appleHouse} alt='home icon' className='icon' onClick={props.homeHandler}/>
          {props.moleculeStatus == 0 && <img src={appleQuestion} alt='Search icon' className='icon' onClick={props.structureChecker}/>}
          {props.moleculeStatus == 1 && <img src={appleCheck} alt='Check icon' className='icon'/>}
          {props.moleculeStatus == -1 && <img src={appleX} alt='X icon' className='icon' onClick={props.displayErrors}/>}
          {/* {horseButtons} */}
          
          <img src={appleHorse} alt='horse icon' className='icon' onClick={props.handleHorseClick}/> 
          
        </div>
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
  const [horseBtns, setHorseBtns] = useState([]);
  const [focusMsg, setFocusMsg] = useState(false);
  
  const handleHorseClick = (e) => {
    setHorseBtns ( horseBtns.concat(<img src={appleHorse} alt='horse icon' className='horse' onClick={handleHorseClick} style={{top: (Math.random() * window.innerHeight), left: (Math.random() * window.innerWidth)}}/>))
    if(horseBtns.length > 10){
      setFocusMsg(true)
    }
  }


  const cacheLoaded = useRef(false);

  useEffect(() => {
    if (!cacheLoaded.current) {
      // console.log(`Loading molecule from cache`);
      getElementFromCache('Molecule', 'https://localhost:300');
      getStateFromCache('State', 'https://localhost:300')
      cacheLoaded.current = true;
    }
  });

  const handleZoomOut = event => {
    addDataIntoCache('State', 'https://localhost:300', scale - .2);
    setScale(scale - .2);
    console.log(`zooming out, ${scale}`)
    setFocusMsg(false)
  }

  const handleZoomIn = event => {
    addDataIntoCache('State', 'https://localhost:300', scale + .2);
    setScale(scale +.2);
    console.log(`zooming in, ${scale}`)
    setFocusMsg(false)
    
  }

  const handleTrash = event => {
    // Remove all elements in the molecule
    deleteCache('Molecule');
    deleteCache('State');
    setCenter({x: 500, y: 200});
    setElements({});
    setMoleculeStatus(0);
    setMoleculeErrors([]);
    setDisplayErrors(false);
    setFocusMsg(false)
    idGen = 0;
  }

  const handleHome = event => {
    setCenter({x: 500, y: 200});
    setFocusMsg(false)
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
    setFocusMsg(false)
    if(event.ctrlKey) {
      if(event.deltaY > 0) {
        handleZoomIn();
      }
      else if(event.deltaY < 0) {
        handleZoomOut();
      }
    }
    else {
      setCenter({x: center.x - event.deltaX, y: center.y - event.deltaY});
      
    }
  }

  const handleDrop = (event) => {
    if(Object.keys(elements).length === 0 && props.selectedElement !== null) {
      var e = window.event;
      setCenter({x: e.clientX - (190), y: e.clientY - (100)});
      console.log(`Center at x:${center.x}, y:${center.y}`)
      handleAddElement(undefined, undefined);
      setFocusMsg(false)
      
      
    }
  }

  const addDataIntoCache = (cacheName, url, response) => {
    deleteCache(cacheName);
    // Converting our response into Actual Response form
    const data = new Response(JSON.stringify(response));
  
    if ('caches' in window) {
      caches.open(cacheName).then((cache) => {
        cache.put(url, data);
      });
    }
  };
  
  const getElementFromCache = async (cacheName, url) => {
    if (typeof caches === 'undefined') return false;
    
    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(url);

    // If no cache exists, add current molecule to cache
    if (!cachedResponse || !cachedResponse.ok) {
      addDataIntoCache('Molecule', 'https://localhost:300', elements);
    }
    else {
      cachedResponse.json().then((item) => {
        setElements(item)
      });
    }
  };

  const getStateFromCache = async (cacheName, url) => {
    if (typeof caches === 'undefined') return false;
    
    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(url);

    // If no cache exists, add current molecule to cache
    if (!cachedResponse || !cachedResponse.ok) {
      addDataIntoCache('State', 'https://localhost:300', scale);
    }
    else {
      cachedResponse.json().then((item) => {
        setScale(item);
      });
    }
  };


  // Function to delete our give cache
  const deleteCache = (cacheName) => {
    if ("caches" in window) {
      caches.delete(cacheName).then(function (res) {
        return res;
      });
    }
  };


  /* Removes a single element at specified id from molecule and updates
  * neighboring elements
  */
  function removeElement(id) {

    const newElementDict = elements;
    console.log(`Elements: ${Object.entries(newElementDict)}`);

    // Replace the id from the neighbors' neighbor list with null
    for (let i = 0; i < newElementDict[id].neighbors.length; i++) {
      let neighborId = newElementDict[id].neighbors[i];
      if(neighborId !== undefined && neighborId !== null) {
        console.log(`Element id: ${neighborId} with type ${typeof neighborId}`);
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
    addDataIntoCache('Molecule', 'https://localhost:300', newElementDict);
  }


  /* Adds element into molecule model using its name, lewis structure,
  * the element it is bonded to, and the position of that bond.
  * NOTE: Position is indicated by an array index. 0 -> 3 where 
  * 0 is the top position moving clockwise.
  */
  function addElement(elementName, source, lStructure, bondedElemId, pos, rotation) {
    // console.log(`rotation: ${rotation}`)

    // pos = (pos + 4) % 8; 

    // Creates an empty element
    const element = {
      id: idGen, 
      elementName: elementName,
      source: source, 
      lStructure: lStructure, 
      neighbors: [...Array(8)], 
      parent: bondedElemId,
      rotation: rotation,
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
    addDataIntoCache('Molecule', 'https://localhost:300', elemDict);
  }

  const handleAddElement = (bondId, posId) => {
    // Set molecule status to 0 (not checked)
    setMoleculeStatus(0);
    setMoleculeErrors([]); // Clear molecule errors
    setDisplayErrors(false); // Hide error display

    // console.log('adding element')
    // display add element params
    // console.log(`name: ${props.selectedElement.name}, name: ${props.selectedElement.lStructure}, bondId: ${bondId}, posId: ${posId}`)
    addElement(props.selectedElement.name, props.selectedElement.source, props.selectedElement.lStructure, bondId, (posId + 4) % 8, props.selectedElement.rotation);
    setFocusMsg(false)
  }

  const handleRemoveElement = (id) => {
    // Set molecule status to 0 (not checked)
    setMoleculeStatus(0);
    setMoleculeErrors([]); // Clear molecule errors
    setDisplayErrors(false); // Hide error display

    // console.log(`removing element ${id}`)
    removeElement(id);
    setFocusMsg(false)
  }

  // console.log(`Elements are ${Object.entries(elements)}`);

  const checkStructure = () => {
    console.log('checking structure')
    console.log(elements)
    
    setFocusMsg(false)

    let errors = [];

    // Iterate through each element in the molecule
    Object.entries(elements).map(([key, element]) => {

      // Iterate through each lStructure in the element and 
      // check if the element has the correct number of neighbors
      for (let pos = 0; pos < element.lStructure.length; pos++) {
        
        const neighbor = element.neighbors[pos];

        if ((neighbor === undefined || neighbor === null) && element.lStructure[pos] !== 0 && element.lStructure[pos] !== 4) {
          errors.push({
            errorMessage: 'Missing Bond',
            errorSpecificMessage: `Element, ${NAMES[element.elementName]}, is missing a bond in ${POSITIONS[pos]} position`,
            element: element.elementName,
            id: element.id,
            position: pos
          });
        }

        // I think this is technically impossible but just in case
        if (neighbor !== undefined && neighbor !== null &&  (element.lStructure[pos] === 0 || element.lStructure[pos] === 4)) {
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
        if (neighbor !== undefined && neighbor !== null && element.lStructure[pos] !== elements[neighbor].lStructure[(pos + 4) % 8]) {
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
      // onWheel={handleCanvasMove}
      onDrop={
        (e) => {
          // console.log(`dropped the element: ${props.selectedElement}`);
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
        handleHorseClick={handleHorseClick} handleTutorial={props.handleTutorial}
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
          selectedElement={props.selectedElement}
          handleAddElement={handleAddElement}
          handleRemoveElement={handleRemoveElement}
          handleDragStart={props.handleDragStart} 
          handleDragEnd={props.handleDragEnd}
          handleHover={handleHover}
          handleOutHover={handleOutHover}
          horseBtns={horseBtns}
        />
        

      </div>
    
      {focusMsg && <div className='instruction-info' id='focusMsg'><h2>Quit horsin' around, get back to work! <img className="smileyFaceHorse" src={smileyFace} /></h2></div>}
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
      coord[key] = {x:-1000, y:-1000};
    }
    else {
      coord[key] = (findRelativePos(props.elements[value.parent], parseInt(key)));
    }
    idGen = parseInt(key) + 1;
    
    return <ElementRender
    key={key} 
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
        // console.log(`Element neighbor ${props.elements[keys[j]].neighbors[k]}`);
        if(((props.elements[keys[j]].lStructure[k] > 0) &&
          (props.elements[keys[j]].lStructure[k] < 4)) && 
          ((props.elements[keys[j]].neighbors[k] === undefined) ||
          (props.elements[keys[j]].neighbors[k] === null) ||
          (props.elements[keys[j]].neighbors[k] === adjustElement)) && 
          (parseInt(keys[j]) !== adjustElement)) {
          elementDisplay.push(<OpenElementRender 
            key={`Hollow of ${keys[j]} at position ${k}`}
            element={props.elements[keys[j]]} 
            selectedElement={props.selectedElement}
            point={findRelativeCoord(k, coord[keys[j]])}
            scale={props.scale}
            pos={k}
            handleAddElement={props.handleAddElement} />);
        }
      }
    }
  }
  return (
    <div>
      {elementDisplay}
      {props.horseBtns}
    </div>
  )

}

export default Canvas;
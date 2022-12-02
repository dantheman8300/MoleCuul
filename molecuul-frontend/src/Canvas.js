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
import Tutorial from './Tutorial';

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

function findRelativeCoord(pos, parent, scale) {
  var x = parent.x;
  var y = parent.y;
  switch(pos) {
    case 0:
      x = parent.x;
      y = parent.y - (scale * 50);
      break;
    case 1:
      x = parent.x + (Math.sqrt(2)/2)*(scale * 50);
      y = parent.y - (Math.sqrt(2)/2)*(scale * 50);
      break;
    case 2:
      x = parent.x + (scale * 50);
      y = parent.y;
      break;
    case 3:
      x = parent.x + (Math.sqrt(2)/2)*(scale * 50);
      y = parent.y + (Math.sqrt(2)/2)*(scale * 50);
      break;
    case 4:
      x = parent.x;
      y = parent.y + (scale * 50);
      break;
    case 5:
      x = parent.x - (Math.sqrt(2)/2)*(scale * 50);
      y = parent.y + (Math.sqrt(2)/2)*(scale * 50);
      break;
    case 6:
      x = parent.x - (scale * 50);
      y = parent.y;
      break;
    case 7:
      x = parent.x - (Math.sqrt(2)/2)*(scale * 50);
      y = parent.y - (Math.sqrt(2)/2)*(scale * 50);
      break;
    default:
  }
  return {x: x, y: y};
}

function IconBox (props) {

  return (
    <div>
      <div className="iconBox">
        <div className='iconRow'>
          <InstructionTile handleTutorial={props.handleTutorial}/>
          <img src={appleMinus} alt='minus icon' className='icon' onClick={props.zoomOutHandler}/>
          <img src={applePlus} alt='plus icon' className='icon' onClick={props.zoomInHandler}/>  
          <img src={appleTrash} alt='trash icon' className='icon' onClick={props.trashHandler} onDrop={props.deleteDropHandler}/>  
          <img src={appleHouse} alt='home icon' className='icon' onClick={props.homeHandler}/>
          {props.moleculeStatus === 0 && <img src={appleQuestion} alt='Search icon' className='icon' onClick={props.structureChecker}/>}
          {props.moleculeStatus === 1 && <img src={appleCheck} alt='Check icon' className='icon'/>}
          {props.moleculeStatus === -1 && <img src={appleX} alt='X icon' className='icon' onClick={props.displayErrors}/>}
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
  const [center, setCenter] = useState({x: 0, y: 0});
  const [dragStart, setDragStart] = useState({x: 0, y: 0});
  const [moleculeStatus, setMoleculeStatus] = useState(0);
  const [moleculeErrors, setMoleculeErrors] = useState([]);
  const [displayErrors, setDisplayErrors] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(undefined);
  const [horseBtns, setHorseBtns] = useState([]);
  const [focusMsg, setFocusMsg] = useState(false);
  const [openTutorial, setTutorial] = useState(false);


  const handleTutorial = event => {
    setTutorial(current => !current)
}
  
  const handleHorseClick = (e) => {
    setHorseBtns ( horseBtns.concat(<img src={appleHorse} alt='horse icon' className='horse' onClick={handleHorseClick} style={{top: (Math.random() * window.screen.availHeight), left: (Math.random() * window.screen.availWidth)}}/>))
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
    updateAllCoord(scale - .2);
    console.log(`zooming out, ${scale}`)
    setFocusMsg(false)
  }

  const handleZoomIn = event => {
    addDataIntoCache('State', 'https://localhost:300', scale + .2);
    setScale(scale +.2);
    updateAllCoord(scale + .2);
    console.log(`zooming in, ${scale}`)
    setFocusMsg(false)
    
  }

  const handleTrash = event => {
    // Remove all elements in the molecule
    deleteCache('Molecule');
    deleteCache('State');
    setCenter({x: 0, y: 0});
    setElements({});
    setMoleculeStatus(0);
    setMoleculeErrors([]);
    setDisplayErrors(false);
    setFocusMsg(false)
    idGen = 0;
  }

  const handleDeleteDrop = event => {
    if(props.selectedElement !== null) {
      event.stopPropagation();
      event.preventDefault();  
      handleRemoveElement(props.selectedElement.id);
      props.handleDragEnd();
    }
  }

  const handleHome = event => {
    let elemDict = elements;
    Object.entries(elements).map(([key, value]) => {
      elemDict[key].point = {x: value.point.x + center.x, y: value.point.y + center.y}
    });
    setElements(elemDict);
    setCenter({x: 0, y: 0});
    setFocusMsg(false);
  }

  const handleCanvasMove = (event) => {
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
      setCenter({x: center.x + event.deltaX, y: center.y + event.deltaY});
      let elemDict = elements;
      Object.entries(elements).map(([key, value]) => {
        elemDict[key].point = {x: value.point.x - event.deltaX, y: value.point.y - event.deltaY}
      });
      setElements(elemDict);
    }
  }

  const handleDrop = (event) => {
    if(props.selectedElement !== null) {
      console.log(`Adding new element without a point`)
      var e = window.event;
      handleAddElement(props.selectedElement, [...Array(8)], {x: e.clientX - (190), y: e.clientY - (100)});
      setFocusMsg(false);
      props.handleDragEnd();
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

  function updateAllCoord(scale) {
    let remainder = Object.values(elements);
    let visited = [];
    while(remainder.length) {
      console.log(`Elements not explored: ${remainder.length}`);
      if(!(visited.length)) {
        visited.push(remainder.pop());
      }
      let curr_mol = visited[0];
      visited = visited.slice(1);
      
      for(let i = 0; i < curr_mol.neighbors.length; i++) {
        for(let j = 0; j < remainder.length; j++) {
          if(curr_mol.neighbors[i] === remainder[j].id) {
            visited.push(remainder[j]);
            updateElement(remainder[j].id, null, null, null, findRelativeCoord(i, curr_mol.point, scale));
            remainder.splice(j, 1);
          }
        }
      }
    }
    


  }


  function updateElement(id, lStructure, rotation, neighbors, point) {
    // Creates new element dictionary
    let elemDict = {};

    let element = elements[id];
    
    // Updates element's lStructure if lStructure is updated
    if(lStructure !== null && rotation !== null) {
      element.lStructure = lStructure;
      element.rotation = rotation;
    }

    // Updates element's position if position is updated
    if(point !== null) {
      element.point = point;
    }

    if(point.x === -100) {
      element.point = {x: window.event.clientX - (190), y: window.event.clientY - (100)};
    }

      // Add back elements to dict except updated one
      Object.entries(elements).map(([key, value]) => {
        if(parseInt(key) !== id) {
          elemDict[key] = value;
        }
      });

    // Adds updated element to new element dictionary
    elemDict[id] = element;


    // Updates element's neigbors if neighbors is updated
    if(neighbors !== null) {
      element.neighbors = neighbors;

      // Creates new element dictionary
      elemDict = {};

      // Add updated element to bond element neighbor list
      Object.entries(elements).map(([key, value]) => {
        for(let i = 0; i < element.neighbors.length; i++) {
          if(parseInt(key) === element.neighbors[i]) {
            value.neighbors[(i + 4) % 8] = id;
          }
        }
        if(parseInt(key) !== id) {
          elemDict[key] = value;
        }
      });
      
      elemDict[id] = element;
  }

    setElements(elemDict);
    addDataIntoCache('Molecule', 'https://localhost:300', elemDict);
  }

  /* Adds element into molecule model using its name, lewis structure,
  * the element it is bonded to, and the position of that bond.
  * NOTE: Position is indicated by an array index. 0 -> 3 where 
  * 0 is the top position moving clockwise.
  */
  function addElement(elementName, source, lStructure, neighbors, rotation, point) {
    // console.log(`rotation: ${rotation}`)

    // Creates an empty element
    const element = {
      id: idGen, 
      elementName: elementName,
      source: source, 
      lStructure: lStructure, 
      neighbors: neighbors,
      rotation: rotation,
      point: point
    };

    idGen += 1;

    // Creates new element dictionary
    let elemDict = {};

    // Add new element to bond element neighbor list
    Object.entries(elements).map(([key, value]) => {
      for(let i = 0; i < element.neighbors.length; i++) {
        if(parseInt(key) === element.neighbors[i]) {
          value.neighbors[(i + 4) % 8] = element.id;
        }
      }
      elemDict[key] = value;
    });

    elemDict[element.id] = element;

    setElements(elemDict);
    addDataIntoCache('Molecule', 'https://localhost:300', elemDict);
  }

  const handleAddElement = (element, neighbors, point) => {
    // Set molecule status to 0 (not checked)
    setMoleculeStatus(0);
    setMoleculeErrors([]); // Clear molecule errors
    setDisplayErrors(false); // Hide error display

    // console.log('adding element')
    // display add element params
    // console.log(`name: ${props.selectedElement.name}, name: ${props.selectedElement.lStructure}, bondId: ${bondId}, posId: ${posId}`)
    addElement(element.name, element.source, element.lStructure, neighbors, element.rotation, point);
    setFocusMsg(false)
  }

  const handleMultiElementAdd = () => {

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


  const handleErrorReset = () => {
    setMoleculeStatus(0);
    setMoleculeErrors([]); // Clear molecule errors
    setDisplayErrors(false); // Hide error display
    setFocusMsg(false)
  }

  return (
    <div 
      className="canvas" 
      onWheel={handleCanvasMove}
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
        trashHandler={handleTrash} deleteDropHandler={handleDeleteDrop}
        homeHandler={handleHome} structureChecker={checkStructure} moleculeStatus={moleculeStatus} 
        moleculeErrors={moleculeErrors} displayErrors={displayMoleculeErrors}
        handleHorseClick={handleHorseClick} handleTutorial={handleTutorial}
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
          handleDrop={handleDrop}
          handleDragEnd={props.handleDragEnd}
          updateElement={updateElement}
          handleHover={handleHover}
          handleOutHover={handleOutHover}
          handleErrorReset={handleErrorReset}
          horseBtns={horseBtns}
        />
        

      </div>
      
      {openTutorial && <Tutorial />}
      {focusMsg && <div className='instruction-info' id='focusMsg'><h2>Quit horsin around, get back to work! ;)</h2></div>}
    </div>
  );
}

function Molecule(props) {
  const [adjustElement, setAdjustElement] = useState(null);
  const [moveInfo, setMoveInfo] = useState([{x:-100, y:-100}, [...Array(8)]]);
  var coord = {};
  
  const handleDragStart = (elementInfo) => {
    setAdjustElement(elementInfo.id);
    props.handleDragStart(elementInfo);
  }

  const handleDragEnd = (id) => {
    setAdjustElement(null);
    props.updateElement(id, null, null, moveInfo[1], moveInfo[0]);
  }

  const handleElementMove = (newElementInfo) => {
    setMoveInfo(newElementInfo);
  }

  // Draws the current molecule according to the data in canvas
  const elementDisplay = Object.entries(props.elements).map(([key, value]) => {
    idGen = parseInt(key) + 1;
    
    return <ElementRender
    key={key} 
    element={value} 
    allElements={props.elements}
    point={value.point}
    scale={props.scale}
    handleDragStart={handleDragStart} 
    handleDragEnd={handleDragEnd}
    handleMouseOver={props.handleHover}
    handleMouseOut={props.handleOutHover}
    updateElement={props.updateElement}
    handleErrorReset={props.handleErrorReset}/>
  });


  if(props.hover) {
    let pointX = {};
    // Adds hollow elements showing where elements can be placed
    for(let j = 0; j < Object.entries(props.elements).length; j++) {
      let keys = Object.keys(props.elements);
      for(let k = 0; k < props.elements[keys[j]].lStructure.length; k++) {
        if(((props.elements[keys[j]].lStructure[k] > 0) &&
          (props.elements[keys[j]].lStructure[k] < 4)) && 
          ((props.elements[keys[j]].neighbors[k] === undefined) ||
          (props.elements[keys[j]].neighbors[k] === null) ||
          (props.elements[keys[j]].neighbors[k] === adjustElement)) && 
          (parseInt(keys[j]) !== adjustElement)) {
          let point = findRelativeCoord(k, props.elements[keys[j]].point, props.scale);

          if(pointX[point.x] !== undefined) {
            if(pointX[point.x][point.y] !== undefined) {
              let neighbor = pointX[point.x][point.y];
              neighbor[(k + 4) % 8] = parseInt(keys[j]);
              pointX[point.x][point.y] = neighbor;
            }
            else {
              let pointY = pointX[point.x];
              let neighbor = [...Array(8)];
              neighbor[(k + 4) % 8] = parseInt(keys[j]);
              pointY[point.y] = neighbor;
             
            }
          }
          else {
            let pointY = {};
            let neighbor = [...Array(8)];
            neighbor[(k + 4) % 8] = parseInt(keys[j]);
            pointY[point.y] = neighbor;
            pointX[point.x] = pointY;
          }
          
          elementDisplay.push(<OpenElementRender 
            key={`Hollow of ${keys[j]} at position ${k}`}
            element={props.elements[keys[j]]} 
            selectedElement={props.selectedElement}
            point={point}
            scale={props.scale}
            neighbors={pointX[point.x][point.y]}
            handleAddElement={props.handleAddElement}
            handleElementMove={handleElementMove} />);
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
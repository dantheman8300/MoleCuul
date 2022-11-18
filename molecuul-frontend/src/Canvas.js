import React, {useState} from 'react';
import "./Canvas.css";
import iconMinus from './icons/icon-minus.png';
import iconPlus from './icons/icon-plus.png';
import iconCursor from './icons/icon-navigation.png';
import iconTrash from './icons/icon-trash.png';
import elementHex from './icons/Element hex.png';
import elementOct from './icons/Element-Carbon.png';
import hollowElement from './icons/Element-Hollow.png';
import hollowElementHighlight from './icons/Element-Hollow-Highlighted.png';

var idGen = 0;

function IconBox (props) {
  return (
    <div className="iconBox">
      <div className='iconRow'>
        <img src={iconMinus} alt='minus icon' className='icon' onClick={props.zoomOutHandler}/>
        <img src={iconPlus} alt='plus icon' className='icon' onClick={props.zoomInHandler}/>  
      </div>
      <div className='iconRow'>
        <img src={iconCursor} alt='cursor icon' className='icon' onClick={props.homeHandler}/>
        <img src={iconTrash} alt='trash icon' className='icon' onClick={props.trashHandler}/>  
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
  }

  const handleHome = event => {
    setCenter({x: 500, y: 200});
  }

  const handleDragStart = (event) => {
    var e = window.event;

    var posX = e.clientX;
    var posY = e.clientY;

    setDragStart({x: posX, y: posY});
  }

  const handleDragEnd = (event) => {
    var e = window.event;

    var posX = e.clientX - dragStart.x;
    var posY = e.clientY - dragStart.y;

    setCenter({x: center.x + posX, y: center.y + posY});
    handleDrop();
  }

  const handleCanvasMove = (event) => {
    setCenter({x: event.deltaX + center.x, y: event.deltaY + center.y});
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
  function addElement(elementName, lStructure, bondedElemId, pos) {

    // pos = (pos + 4) % 8; 

    // Creates an empty element
    const element = {
      id: idGen, 
      elementName: elementName, 
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
    console.log('adding element')
    // display add element params
    console.log(`name: ${props.selectedElement.name}, name: ${props.selectedElement.lStructure}, bondId: ${bondId}, posId: ${posId}`)
    addElement("hydrogen-3", props.selectedElement.lStructure, bondId, (posId + 4) % 8);
  }

  const handleRemoveElement = (id) => {
    console.log(`removing element ${id}`)
    removeElement(id);
  }

  return (
    <div 
      className="canvas" 
      draggable
      onWheel={handleCanvasMove}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
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
      />
      <div >
        <Molecule 
          scale={scale} 
          elements={elements} 
          mouseX={mouseX} 
          mouseY={mouseY}
          center={center}
          handleAddElement={handleAddElement}
          handleRemoveElement={handleRemoveElement}   
        />
      </div>
    </div>
  );
}

function Molecule(props) {
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
  
  // Draws the current molecule according to the data in canvas
  const elementDisplay = Object.entries(props.elements).map(([key, value]) => {
    coord[key] = (findRelativePos(props.elements[value.parent], parseInt(key)));
    var source = elementOct;
    return <img
        key={key} 
        src={source} 
        alt={value.elementName}
        draggable
        onMouseOver={
          (e) => {
            e.currentTarget.height = e.currentTarget.width = props.scale * 55;
            // print source id
            console.log(`Element ${value.elementName} id: ${value.id}`);
            console.log(`Neighbors: ${value.neighbors}`);
            console.log(`Parent: ${value.parent}`);
          }
        } 
        onMouseOut={e => (e.currentTarget.height = e.currentTarget.width = props.scale * 50)}
        onDragStart={
          () => {
            props.handleRemoveElement(key);
          }
        }
        width={props.scale * 50} 
        height={props.scale * 50} 
        style={{position: 'absolute', top: coord[key].y, left: coord[key].x}} />
  });

  console.log(`Element Display: ${elementDisplay}`);

  // Adds hollow elements showing where elements can be placed
  for(let j = 0; j < Object.entries(props.elements).length; j++) {
    let keys = Object.keys(props.elements);
    for(let k = 0; k < props.elements[keys[j]].lStructure.length; k++) {
      console.log(`Element neighbor ${props.elements[keys[j]].neighbors[k]}`);
      if((props.elements[keys[j]].lStructure[k] > 0) && (props.elements[keys[j]].neighbors[k] === undefined)) {
        // console.log(`Element at position ${k} of element ${keys[j]}`);
        let point = findRelativeCoord(k, coord[keys[j]]);
        console.log(`Point: ${point.x}, ${point.y}`);
        elementDisplay.push(<img
          key={Math.random()} 
          src={hollowElementHighlight}
          // onMouseOver={e => (e.currentTarget.src = hollowElementHighlight)}
          // onMouseOut={e => (e.currentTarget.src = hollowElement)} 
          onDragOver={
            (e) => {
              e.stopPropagation();
              e.preventDefault();
              console.log(`Drag Over, parent: ${props.elements[keys[j]].id}, posId: ${k}`);
              (e.currentTarget.src = hollowElementHighlight)
            }
          } 
          onDragLeave={
            (e) => {
              e.stopPropagation();
              e.preventDefault();
              console.log("Drag Leave");
              (e.currentTarget.src = hollowElement)
            }
          }
          onDrop={
            (e) => {
              console.log("Drop 6");
              (e.currentTarget.src = hollowElement)
              console.log(`parent: ${props.elements[keys[j]].id}`);
              console.log(`bond position: ${k}`);
              props.handleAddElement(props.elements[keys[j]].id, k);
            }
          }
          alt={'open node'}
          width={props.scale * 50} 
          height={props.scale * 50} 
          style={{position: 'absolute', top: point.y, left: point.x}}
          />)
      }
    }
  }

  return (
    elementDisplay
  )

}

export default Canvas;
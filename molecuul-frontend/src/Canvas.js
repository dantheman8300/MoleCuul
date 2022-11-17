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
  const [elements, setElements] = useState([]);
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
    setElements([]);
  }

  const handleHome = event => {
    setCenter({x: 500, y: 200});
  }

  const handleMouseMove = () => {
    var e = window.event;

    var posX = e.clientX;
    var posY = e.clientY;

    setMouseX(posX)
    setMouseY(posY)

    // console.log(`(${mouseX}, ${mouseY})`)
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
  }

  const handleCanvasMove = (event) => {
    setCenter({x: event.deltaX + center.x, y: event.deltaY + center.y});
  }

  /* Removes a single element at specified id from molecule and updates
  * neighboring elements
  */
  function removeElement(id) {
    
    // Print the current molecule's current elements
    for (var i = 0; i < elements.length; i++) {
      console.log(elements[i].id);
    }

    // const newMolecule = elements.map(obj => {
    // // Find elements that are neighbors with removed node
    //   if(obj.neighbors.find(item => item === id) !== undefined) {
    //     // Remove neighbors association with the node
    //     obj.neighbors = obj.neighbors.filter((neighbor, i) => { return neighbor !== id });
    //   }
    //   // Return any elements that are not the removed node
    //   if(obj !== id) {
    //     return obj;
    //   }
    // });

    // Get elements that are neighbors with removed node
    const neighbors = elements.filter(obj => {
      return obj.neighbors.find(item => item === id) !== undefined;
    });

    // Remove the element from the molecule
    const newMolecule = elements.filter((element, i) => { return element.id !== id });

    // Replace the id from the neighbors' neighbor list with null
    for (var i = 0; i < neighbors.length; i++) {
      for (var j = 0; j < neighbors[i].neighbors.length; j++) {
        if(neighbors[i].neighbors[j] === id) {
          neighbors[i].neighbors[j] = null;
        }
      }
    }

    // Print the new molecule's new elements
    for (var i = 0; i < newMolecule.length; i++) {
      console.log(newMolecule[i].id);
    }

    setElements(newMolecule);
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

    console.log(`adding element ${elementName} to ${bondedElemId} at position ${pos}`)

    idGen += 1;

    // Adds neighbor to new element's neighbor list if neighbor exists
    if(element.parent === null) {
      setElements([element]);
    }
    // Finds bondedElemId in current molecule and updates its neighbor list if bondedElemId exists
    else {
      element.neighbors[pos] = bondedElemId;

      // Add new element to bond element neighbor list
      const newMolecule = elements.map(obj => {
        if(obj.id === bondedElemId) {
          obj.neighbors[(pos + 4) % 8] = element.id;
        }
        return obj;
      });

      setElements([...newMolecule, element]);
    }

    //   const newMolecule = elements.map(obj => {
    //       if(obj.id === bondedElemId) {
    //         let newNeighbors = [...obj.neighbors];
    //         newNeighbors[(pos + 4) % 8] = element.id;
    //         console.log(`updated neighbor, ${obj.elementName}`)
    //         return {
    //           ...obj,
    //           neighbors: newNeighbors
    //         };
    //       }
    //       return obj;
    //     });
    //   // updates molecule
    //   setElements([...newMolecule, element]);
    // }
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
      onDrop={event => {
        console.log(`dropped ${props.selectedElement}`)
        }
      }
      onWheel={handleCanvasMove}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
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
  const coord = []

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
      let pos = -1;
      // Finds the relative position of the element in regards to the parent
      for(let i = 0; i < parent.neighbors.length; i++) {
        if(parent.neighbors[i] === id) {
          pos = i;
        }
      }
      if(pos === -1) {
        pos = id
      }
      point = findRelativeCoord(pos, coord[parent.id]);
    }
    return point
  }  
  
  // Draws the current molecule according to the data in canvas
  const elementDisplay = props.elements.map(({id, elementName, parent, neighbors }) => {
    coord.push(findRelativePos(props.elements[parent], id));
    // console.log(`Element ${elementName} neighbor's list: ${neighbors}`);
    var source = elementOct;
    return <img
        key={id} 
        src={source} 
        alt={elementName}
        draggable
        onMouseOver={
          (e) => {
            e.currentTarget.height = e.currentTarget.width = props.scale * 55;
            // print source id
            console.log(`Element ${elementName} id: ${id}`);
            console.log(`Neighbors: ${neighbors}`);
            console.log(`Bonds: ${props.elements[id].lStructure}`);
          }
        } 
        onMouseOut={e => (e.currentTarget.height = e.currentTarget.width = props.scale * 50)}
        onDragStart={
          () => {
            props.handleRemoveElement(id);
          }
        }
        width={props.scale * 50} 
        height={props.scale * 50} 
        style={{position: 'absolute', top: coord[id].y, left: coord[id].x}} />
  });

  const handleDragOver = (event) => {
    console.log("Drag Over");
  }

  // Adds hollow elements showing where elements can be placed
  for(let j = 0; j < props.elements.length; j++) {
    for(let k = 0; k < props.elements[j].lStructure.length; k++) {
      if((props.elements[j].lStructure[k] > 0) && (props.elements[j].neighbors[k] === undefined)) {
        let point = findRelativePos(props.elements[j], k)
        elementDisplay.push(<img
          key={Math.random()} 
          src={hollowElement}
          // onMouseOver={e => (e.currentTarget.src = hollowElementHighlight)}
          // onMouseOut={e => (e.currentTarget.src = hollowElement)} 
          onDragOver={
            (e) => {
              e.stopPropagation();
              e.preventDefault();
              console.log(`Drag Over, parent: ${props.elements[j].id}, posId: ${k}`);
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
              console.log(`parent: ${props.elements[j].id}`);
              console.log(`bond position: ${k}`);
              props.handleAddElement(props.elements[j].id, k);
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

  // Adds hollow elements when the molecule is empty
  if (props.elements.length === 0) {
    elementDisplay.push(<img
      key={Math.random()}
      src={
        hollowElementHighlight
      }
      onDragOver={
        (e) => {
          e.stopPropagation();
          e.preventDefault();
          console.log("Drag Over");
          (e.currentTarget.src = hollowElementHighlight)
        }
      }
      onDrop={
        (e) => {

          console.log("Drop 7");
          (e.currentTarget.src = hollowElement)
          props.handleAddElement(undefined, undefined);
        }
      }
      alt={'open node'}
      width={props.scale * 50}
      height={props.scale * 50}
      style={{ position: 'absolute', top: props.center.y, left: props.center.x }}
    />)
  }

    
  return (
    elementDisplay
  )

}

export default Canvas;
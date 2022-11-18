import React, {useState} from 'react';
import "./Canvas.css";
import iconMinus from './icons/icon-minus.png';
import iconPlus from './icons/icon-plus.png';
import iconCursor from './icons/icon-navigation.png';
import iconTrash from './icons/icon-trash.png';
// import elementHex from './icons/Element hex.png';
import elementOct from './icons/Element-Carbon.png';
import hollowElement from './icons/Element-Hollow.png';
import hollowElementHighlight from './icons/Element-Hollow-Highlighted.png';
import ValidateMolecule from './ValidateMolecule';
import InstructionTile from './InstructionTile';

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
        <img src={iconTrash} alt='trash icon' className='icon' onClick={props.trashHandler}/>  
      </div>
      <div className='iconRow'>
        <ValidateMolecule />
        <InstructionTile />
      </div>
    </div>
  )
}

function Canvas (props) {

  const [scale, setScale] = useState(1);
  const [elements, setElements] = useState([]);
  const [mouseX, setMouseX] = useState(500);
  const [mouseY, setMouseY] = useState(200);

  // console.log(props.selectedElement)

  // if(props.newElement ) {
  //   addElement();
  // }
  
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


  const handleMouseMove = () => {
    var e = window.event;

    var posX = e.clientX;
    var posY = e.clientY;

    setMouseX(posX)
    setMouseY(posY)

    // console.log(`(${mouseX}, ${mouseY})`)
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
          neighbors[i].neighbors[j] = undefined;
        }
      }
    }

    // Replace the parent of the neighbors with another element if possible, otherwise null
    for (var i = 0; i < neighbors.length; i++) {
      if(neighbors[i].parent !== null) {
        // Find the parent of the neighbor
        const parent = newMolecule.find(obj => {
          return obj.id === neighbors[i].parent;
        });

        // Find the index of the neighbor in the parent's neighbor list
        const index = parent.neighbors.indexOf(neighbors[i].id);

        // Find the first non-null neighbor of the neighbor
        const newNeighbor = neighbors[i].neighbors.find(obj => {
          return obj !== null;
        });
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
      onMouseMove={handleMouseMove}
      onWheel={handleMouseWheel}
      onDrop={event => {
        console.log(`dropped ${props.selectedElement}`)
        }
      }
    >
      <IconBox 
        zoomInHandler={handleZoomIn} zoomOutHandler={handleZoomOut}
        trashHandler={handleTrash}
      />
      <div >
        <Molecule 
          scale={scale} 
          elements={elements} 
          mouseX={mouseX} 
          mouseY={mouseY} 
          handleAddElement={handleAddElement}
          handleRemoveElement={handleRemoveElement}   
        />
      </div>
    </div>
  );
}

function Molecule(props) {

  const [dragX, setDragX] = useState(500);
  const [dragY, setDragY] = useState(500);
  const coord = []

  // const handleDrag = (event) => {
  //   var e = window.event;

  //   var posX = e.clientX;
  //   var posY = e.clientY;

  //   setDragX(posX);
  //   setDragY(posY);

  //   console.log(`Drag: (${posX}, ${posY})`)
  // }

  const handleDragEnd = (event) => {
    var e = window.event;

    var posX = e.clientX;
    var posY = e.clientY;

    setDragX(posX);
    setDragY(posY);

    console.log(`Drag: (${posX}, ${posY})`)
  }

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
    // Find out if element is root of tree
    let point = {x: dragX - (props.scale * 50 / 2), y:dragY - (props.scale * 50 / 2)};
    
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

  // Creates draws the current molecule according to the data in canvas
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
            console.log(`Parent: ${parent}`);
          }
        } 
        onMouseOut={e => (e.currentTarget.height = e.currentTarget.width = props.scale * 50)}
        onDragStart={
          () => {
            props.handleRemoveElement(id);
          }
        }
        // onDragEnd={handleDragEnd}
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
      console.log(`Element ${j} has bond ${k} with ${props.elements[j].neighbors[k]} neighbors and ${props.elements[j].lStructure[k]} bonds`);
      if((props.elements[j].lStructure[k] > 0) && (props.elements[j].neighbors[k] === undefined)) {
        console.log(`----Element ${j} has bond ${k} with ${props.elements[j].neighbors[k]} neighbors and ${props.elements[j].lStructure[k]} bonds`);
        let point = findRelativePos(props.elements[j], k)
        console.log(`point: ${point.x}, ${point.y}`)
        elementDisplay.push(<img
          key={Math.random()} 
          src={hollowElement}
          // onMouseOver={e => (e.currentTarget.src = hollowElementHighlight)} 
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
      style={{ position: 'absolute', top: dragY - (props.scale * 50 / 2), left: dragX - (props.scale * 50 / 2) }}
    />)
  }

    
  return (
    elementDisplay
  )

}

export default Canvas;
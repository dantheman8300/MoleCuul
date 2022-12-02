import React, {useState} from 'react';
import ElementImage from './ElementImage';
import hollowElementHighlight from './images/oct-border.svg';
import { pushRotate } from 'react-burger-menu';

/* Element tile rendered on canvas */
function ElementRender(props) {
    const [showElement, setShowElement] = useState(true);
    const allElements = props.allElements;
    const id = props.element.id;
    const image = props.element.source;
    const symbol = props.element.elementName;
    const elementId = props.element.id;
    const scale = props.scale;
    const posX = props.point.x;
    const posY = props.point.y;
    const rotation = props.element.rotation;
    const lStructure = props.element.lStructure;

    const elementStyle = {
        position: "relative",
        alignSelf: "center",
    }

    const rotateLStructure = (rotation) => {
        let originalLStructure = lStructure;
        let rotatedLStructure = [];
        for (let i = 0; i < originalLStructure.length; i++) {
            rotatedLStructure.push(originalLStructure[(8 - (rotation % 8) + i) % 8]);
        }
        return rotatedLStructure;
    }


    return (
        <div 
        draggable
        onDrag={
        () => {
            setShowElement(false);
            const elementInfo = {
                id: id,
                name: symbol,
                lStructure: lStructure,
                source: image,
                rotation: rotation,
                point: props.point
            };
            // Remove all neighbors' associations with this node
            for(let i = 0; i < props.element.neighbors.length; i++) {
                if(props.element.neighbors[i] !== undefined || props.element.neighbors[i] !== null) {
                    let newNeighbors = allElements[props.element.neighbors[i]].neighbors;
                    let removeId = newNeighbors.findIndex(id);
                    newNeighbors[removeId] = undefined;
                    props.updateElement(id, null, null, newNeighbors, null);        
                }
            }
            // Remove all known neighbors in this node
            props.updateElement(id, null, null, [...Array(8)], null);
            props.handleDragStart(elementInfo);
        }
        }
        onDrop={
        () => {
            setShowElement(true);
            props.handleDragEnd(elementId);
        }
        }
        onMouseOver={
            () => {
                console.log(`Element ${id} with ${symbol}`);
                console.log(`       lStructure ${lStructure}`);
                console.log(`       Neighbors ${props.element.neighbors}`);
                console.log(`       Parent ${props.element.parent}`);
                console.log(`       Point (${posX}, ${posY})`);
                props.handleMouseOver(elementId);
            }
        }
        onMouseOut={
            () => {
                props.handleMouseOut(elementId);
            }
        }
        onClick={
            () => {
                props.updateElement(id, rotateLStructure(1), rotation + 1, null, null);
                props.handleErrorReset();
            }
        }
        style={{position: 'absolute', top: posY, left: posX, zIndex: (showElement ? 4 : -1)}}>
            <ElementImage image={image} scale={scale} symbol={symbol} rotation={rotation}/>
        </div>
    )
};

export default ElementRender;
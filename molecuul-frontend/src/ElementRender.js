import React, {useState} from 'react';
import ElementImage from './ElementImage';
import hollowElementHighlight from './images/oct-border.svg';

/* Element tile rendered on canvas */
function ElementRender(props) {
    const [showElement, setShowElement] = useState(true);
    const image = props.element.source;
    const symbol = props.element.elementName;
    const elementId = props.element.id;
    const scale = props.scale;
    const posX = props.point.x;
    const posY = props.point.y;

    return (
        <div 
        draggable
        onDragStart={
        () => {
            setShowElement(false);
            const elementInfo = {
                id: props.element.id,
                name: symbol,
                lStructure: props.element.lStructure,
                source: image
            };
            props.handleDragStart(elementInfo);
        }
        }
        onDragEnd={
        () => {
            props.handleDragEnd(elementId);
        }
        }
        onMouseOver={
        () => {
            console.log(`Element id: ${props.element.id} with type of ${typeof props.element.id}`);
            console.log(` Element name: ${symbol} with type of ${typeof symbol}`);
            console.log(` Element lStructure: ${props.element.lStructure} with type of ${typeof props.element.lStructure}`);
            console.log(` Element neighbors: ${props.element.neighbors} with type of ${typeof props.element.neighbors}`);
            console.log(` Element parent: ${props.element.parent} with type of ${typeof props.element.parent}`);   
        }
        }
        style={{position: 'absolute', top: posY, left: posX, zIndex: 4}}>
            <ElementImage image={image} scale={scale} symbol={symbol}/>
        </div>
    )
};

export default ElementRender;
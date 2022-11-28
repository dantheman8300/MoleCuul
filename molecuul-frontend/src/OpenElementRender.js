import React, {useState} from 'react';
import hollowElement from './icons/Element-Hollow.png';
import hollowElementHighlight from './images/oct-border.svg';
import ElementRender from "./ElementRender";

/* Open Element tile rendered in canvas */
function OpenElementRender(props) {
    const [hover, setHover] = useState(false);
    const image = props.element.source;
    const symbol = props.element.elementName;
    const elementId = props.element.id;
    const scale = props.scale;
    const posX = props.point.x;
    const posY = props.point.y;
    const bondPos = props.pos;

    const handleDragOver = (e) => {
        e.currentTarget.src = require(`./images/${image}.svg`);
    }

    const handleDragLeave = (e) => {
        e.currentTarget.src = hollowElementHighlight;
    }

    const handleDrop = (e) => {
        (e.currentTarget.src = hollowElement)
        console.log(`parent: ${elementId}`);
        console.log(`bond position: ${bondPos}`);
        props.handleAddElement(elementId, bondPos);
    }

    return (
        <img
            key={'Open node of ' + props.element.id} 
            src={hollowElementHighlight}
            alt={'open node'}
            width={scale * 50} 
            height={scale * 50} 
            style={{position: 'absolute', top: posY, left: posX, zIndex: 2}}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            />);
};

export default OpenElementRender;
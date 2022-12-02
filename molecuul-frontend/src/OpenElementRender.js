import React, {useState} from 'react';
import hollowElement from './icons/Element-Hollow.png';
import hollowElementHighlight from './images/oct-border.svg';
import ElementImage from './ElementImage';

/* Open Element tile rendered in canvas */
function OpenElementRender(props) {
    const [hover, setHover] = useState(false);
    const image = props.selectedElement.source;
    const symbol = props.selectedElement.name;
    const elementId = props.element.id;
    const scale = props.scale;
    const posX = props.point.x;
    const posY = props.point.y;
    const neighbors = props.neighbors;
    const rotation = props.selectedElement.rotation;

    // const handleDragOver = (e) => {
    //     e.currentTarget.src = require(`./images/${image}.svg`);
    // }

    const handleDragEnter = (e) => {
        setHover(true);
        props.handleElementMove([props.point, neighbors]);
    }

    const handleDragLeave = (e) => {
        setHover(false);
        props.handleElementMove([{x:-100, y:-100}, [...Array(8)]]);
    }

    return (
        <div
            onDragLeave={handleDragLeave}
            onDragOver={handleDragEnter}
            width={scale * 50} 
            height={scale * 50} 
            style={{position: 'absolute', top: posY, left: posX, zIndex: 2}}>
        {hover && <ElementImage image={image} scale={scale} symbol={symbol} rotation={rotation}/>}
        {!hover && <img
            key={'Open node of ' + props.element.id} 
            src={hollowElementHighlight}
            alt={'open node'}
            width={scale * 50} 
            height={scale * 50}
            />}
        </div>
            );
};

export default OpenElementRender;
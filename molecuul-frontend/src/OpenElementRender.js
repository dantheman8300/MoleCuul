import React, {useState} from 'react';
import hollowElementHighlight from './images/oct-border.svg';
import ElementImage from './ElementImage';

/* Open Element tile rendered in canvas */
function OpenElementRender(props) {
    const [hover, setHover] = useState(false);
    const image = props.selectedElement.source;
    const symbol = props.selectedElement.name;
    const scale = props.scale;
    const posX = props.point.x;
    const posY = props.point.y;
    const neighbors = props.neighbors;
    const rotation = props.selectedElement.rotation;

    const handleDragEnter = (e) => {
        setHover(true);
    }

    const handleDragLeave = (e) => {
        setHover(false);
    }

    const handleDrop = (e) => {
        props.handleAddElement(props.selectedElement, neighbors, props.point);
        props.handleDragEnd();
        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <div
            onDragLeave={handleDragLeave}
            onDragOver={handleDragEnter}
            onDrop={handleDrop}
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
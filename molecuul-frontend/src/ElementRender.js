import React, {useState} from 'react';
import ElementImage from './ElementImage';
import hollowElementHighlight from './images/oct-border.svg';
import { pushRotate } from 'react-burger-menu';

/* Element tile rendered on canvas */
function ElementRender(props) {
    const [showElement, setShowElement] = useState(true);
    const image = props.element.source;
    const symbol = props.element.elementName;
    const elementId = props.element.id;
    const scale = props.scale;
    const posX = props.point.x;
    const posY = props.point.y;
    const rotation = props.element.rotation;

    const elementStyle = {
        position: "relative",
        alignSelf: "center",
    }

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
                props.handleMouseOver(elementId);
            }
        }
        onMouseOut={
            () => {
                props.handleMouseOut(elementId);
            }
        }
        style={{position: 'absolute', top: posY, left: posX, zIndex: 4}}>
            <ElementImage image={image} scale={scale} symbol={symbol} rotation={rotation}/>
        </div>
    )
};

export default ElementRender;
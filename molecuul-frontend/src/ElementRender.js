import React, {useState} from 'react';
import { pushRotate } from 'react-burger-menu';

/* Element tile rendered on canvas */
function ElementRender(props) {
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
            <img className='element-render' src={require(`./images/${image}.svg`)} alt={'render of' + image} style={{height:scale * 50, width:scale * 50, transform: `rotate(${rotation * 45}deg)`}}/>
            <div id='elemSym' style={{height:1, width:1, fontSize:scale * 20}}>{symbol}</div>
        </div>
    )
};

export default ElementRender;
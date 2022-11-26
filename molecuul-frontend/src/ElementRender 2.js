import React, {useState} from 'react';

/* Element tile rendered on canvas */
function ElementRender(props) {
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
        style={{position: 'absolute', top: posY, left: posX, zIndex: 4}}>
            <img className='element-render' src={require(`./images/${image}.svg`)} alt={'render of' + image} style={{height:scale * 50, width:scale * 50}}/>
            <div id='elemSym' style={{height:1, width:1, fontSize:scale * 20}}>{symbol}</div>
        </div>
    )
};

export default ElementRender;
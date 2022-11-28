import React from 'react';
import Octagon from "./Octagon";
import OctagonSymbol from "./OctagonSymbol.js";

/* Element tile rendered on configuration menu */
function ElementTile(props) {
    const image = props.image;
    const symbol = props.symbol;
    const elementId = props.id;


    const getElementInfo = () => {
        const elementInfo = getElementInfoFromDatabase(elementId);
        props.handleDragStart(elementInfo);
    }

    const getElementInfoFromDatabase = (id) => {
        // Get element info from database based on id
        const elementInfo = { // Todo: get element info from database
            name: symbol, // Pass through the symbol for rendering
            lStructure: [0,1,0,1,0,1,0,1],
            source: image // Need to attach source to elementInfo for rendering on canvas!
        };
        return elementInfo;
    }

    return (
        <div 
            className='tile-and-symbol' 
            draggable 
            onDragStart={getElementInfo}
            onDragEnd={props.handleDragEnd}
        >
            <Octagon image={image} alt={"image of" + image} />
            <OctagonSymbol symbol={symbol}/>
        </div>

    )
};

export default ElementTile;
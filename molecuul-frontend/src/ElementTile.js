import React from 'react';
import Octagon from "./Octagon";
import OctagonSymbol from "./OctagonSymbol.js";

/* Element tile rendered on configuration menu */
function ElementTile(props) {
    const image = props.image;
    const symbol = props.symbol;
    const elementId = props.id;
    let lStructure = props.image.lStructure;

    const [rotation, setRotation] = React.useState(0);



    const getElementInfo = () => {
        const elementInfo = getElementInfoFromDatabase(elementId);
        props.handleDragStart(elementInfo);
    }

    const getElementInfoFromDatabase = (id) => {
        // Get element info from database based on id
        const elementInfo = { 
            name: symbol, // Pass through the symbol for rendering
            lStructure: lStructure.slice(), // Pass through a copy of the lStructure
            source: image.imagefile, // Need to attach source to elementInfo for rendering on canvas!
            rotation: rotation % 8
        };
        return elementInfo;
    }

    const handleRotation = (rotator) => {
        console.log(`Starting rotation: ${rotation}`);
        console.log(`Rotation changed with rotator ${rotator}`);
        if (rotator === 0) {
            lStructure = props.image.lStructure;
            setRotation(0);
        } else {
            rotateLStructure();
            setRotation(rotation + rotator);
        }

        console.log(`Rotation changed to ${rotation}`);
    }

    const rotateLStructure = () => {
        let temp = lStructure[7];
        lStructure[7] = lStructure[6];
        lStructure[6] = lStructure[5];
        lStructure[5] = lStructure[4];
        lStructure[4] = lStructure[3];
        lStructure[3] = lStructure[2];
        lStructure[2] = lStructure[1];
        lStructure[1] = lStructure[0];
        lStructure[0] = temp;
    }

    return (
        <div 
            className='tile-and-symbol' 
            draggable 
            onDragStart={getElementInfo}
            onDragEnd={props.handleDragEnd}
            onClick={() => handleRotation(1)}
        >
            <Octagon image={image} alt={"image of" + image} rotation={rotation} />
            <OctagonSymbol symbol={symbol}/>
        </div>

    )
};

export default ElementTile;
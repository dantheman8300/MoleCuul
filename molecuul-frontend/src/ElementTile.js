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
        console.log(`rotated lStructure: ${rotateLStructure(rotation).slice()}`);
        // Get element info from database based on id
        const elementInfo = { 
            name: symbol, // Pass through the symbol for rendering
            lStructure: rotateLStructure(rotation).slice(), // Pass through a copy of the lStructure
            source: image.imagefile, // Need to attach source to elementInfo for rendering on canvas!
            rotation: rotation % 8
        };
        return elementInfo;
    }

    const handleRotation = (rotator) => {
        props.setFocusMsg(false)
        if(props.openTutorial && props.curInd === 2){
            props.increaseCurInd()
        }
        console.log(`Starting rotation: ${rotation}`);
        console.log(`Rotation changed with rotator ${rotator}`);
        console.log(`lStructure before rotation: ${lStructure}`);
        if (rotator === 0) {
            lStructure = props.image.lStructure;
            setRotation(0);
        } else {
            setRotation(rotation + rotator);
        }
        console.log(`Rotation changed to ${rotation}`);
    }

    const rotateLStructure = (rotation) => {
        console.log(`Rotating lStructure by ${rotation}`);
        let originalLStructure = props.image.lStructure;
        let rotatedLStructure = [];
        for (let i = 0; i < originalLStructure.length; i++) {
            rotatedLStructure.push(originalLStructure[(8 - (rotation % 8) + i) % 8]);
        }
        return rotatedLStructure;
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
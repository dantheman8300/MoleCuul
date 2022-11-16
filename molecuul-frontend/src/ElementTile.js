import React, {useState} from 'react';
import Octagon from "./Octagon";
import OctagonSymbol from "./OctagonSymbol.js";
import shadow from "./images/oct-shadow.svg";

/* Element tile rendered on configuration menu */
function ElementTile(props) {
    const [isClicked, Active] = useState(false);
    const image = props.image;
    const symbol = props.symbol;
    const elementId = props.id;


    // const handleClick = event => {
    //     Active(current => !current);
    // }

    const getElementInfo = () => {
        const elementInfo = getElementInfoFromDatabase(elementId);
        props.handleDragStart(elementInfo);
    }

    const getElementInfoFromDatabase = (id) => {
        // Get element info from database based on id
        const elementInfo = { // Todo: get element info from database
            name: "Hydrogen-0", 
            lStructure: [1,0,1,0,1,0,1,0]
        };
        return elementInfo;
    }

    return (
        <div 
            className='tile-and-symbol' 
            draggable 
            onDragStart={getElementInfo}
        >
            <Octagon image={image} alt={"image of" + image} />
            <OctagonSymbol symbol={symbol}/>
            {isClicked && <img className="oct-shadow" src={shadow} alt='octagon shadow' />}
        </div>
    )
};

export default ElementTile;
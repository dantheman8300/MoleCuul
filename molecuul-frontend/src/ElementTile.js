import React from 'react';
import Octagon from "./Octagon";
import OctagonSymbol from "./OctagonSymbol.js";

/* Element tile rendered on configuration menu */
function ElementTile(props) {
    const image = props.image;
    const symbol = props.symbol;

    return (
        <div className='tile-and-symbol'>
            <Octagon image={image} alt={"image of" + image} />
            <OctagonSymbol symbol={symbol}/>
        </div>
    )
};

export default ElementTile;
import React from 'react';
import Octagon from "./Octagon";

function ElementTile() {
    return (
        <div className="elementTile">
            <Octagon/>
            <span id="elementName">C</span>
        </div>
    )
};

export default ElementTile;
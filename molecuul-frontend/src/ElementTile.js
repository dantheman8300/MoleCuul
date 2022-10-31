import React from 'react';
import Octagon from "./Octagon";

function ElementTile() {
    const pColor = "#194dFF";
    const pSize = 100;
    return (
        <div className="elementTile">
            <Octagon polyColor = {pColor} polySize = {pSize}/>
            <span id="elementTileSym">C</span>
        </div>
    )
};

export default ElementTile;
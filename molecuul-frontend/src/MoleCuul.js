import React from "react";
import Octagon from "./Octagon";
const xVal = 180;
const yVal = 160;
const len = 100;
function MoleCuul() {
    return (
        <div className="container">
            <Octagon xCoord = {xVal} yCoord = {yVal} lengthOctagon = {len}/>
        </div>
    );
}

export default MoleCuul;
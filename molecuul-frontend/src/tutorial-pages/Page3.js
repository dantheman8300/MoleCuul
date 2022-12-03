import React from "react";
import Arrow from "../Arrow";
import BondKey from "./BondKey";

// tutorial pg 3: drag and drop (canvas)
function PageThree (props) {
    return (
        <div className="pages">
            <div className='page-one-arrow'>
                <Arrow/>
            </div>
            <div className="text-box" id="page-three-box">drag an octagon to add it to the canvas </div>
            <BondKey />
        </div>
    )
}

export default PageThree;
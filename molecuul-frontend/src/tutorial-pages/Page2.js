import React from "react";
import Arrow from "../Arrow";
import BondKey from "./BondKey";

// tutorial pg 2: click to rotate (config menu)
function PageTwo (props) {
    return (
        <div className="pages">
            <div className='page-one-arrow'>
                <Arrow/>
            </div>
            <div className="text-box" id="page-one-box">click on an octagon to rotate it</div>
            <BondKey /> 
        </div>
    )
}

export default PageTwo;
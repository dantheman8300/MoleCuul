import React from "react";
import Arrow from "../Arrow";
import BondKey from "./BondKey";

// tutorial pg 1 scroll for more options (config menu)
function PageOne (props) {
    return (
        <div className="pages">
            <div className='page-one-arrow'>
                <Arrow/>
            </div>
            <div className="text-box" id="page-one-box">scroll to see more options</div>
            <BondKey />
        </div>
    )
}

export default PageOne;
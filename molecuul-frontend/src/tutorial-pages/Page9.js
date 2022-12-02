import React from "react";

import Arrow from "../Arrow";
import appleCheck from "../icons/check-mark-button_2705 2.png";

import appleX from "../icons/cross-mark_274c.png";

function PageNine (props) {


    

    return (
        <div className="pages">
            <div className='page-eight-arrow'>
                <Arrow/>
            </div>

            <div className="text-box" id="page-eight-box">x means you molecule is incorrect, click on the x to see your errors</div>
            <div className="text-box" id="check-box"> key: 
            <div className="check-row"><img src={appleCheck} alt="check box" className="tut-icon"/> valid</div>
            <div className="check-row"><img src={appleX} alt="x" className="tut-icon"/> invalid</div></div>
        
        </div>
)

}

export default PageNine;
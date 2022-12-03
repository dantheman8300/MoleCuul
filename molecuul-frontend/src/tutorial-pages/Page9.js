import React from "react";
import Arrow from "../Arrow";
import appleCheck from "../icons/check-mark-button_2705 2.png";
import appleX from "../icons/cross-mark_274c.png";

// tutorial page 9: validate icon click (canvas)
function PageNine (props) {
    return (
        
        <div className="pages">
            <div className='page-eight-arrow'>
                <Arrow/>
            </div>
            <div className="text-box" id="page-eight-box">validate icon - check to see if your molecule is valid</div>
            <div className="text-box" id="check-box"> key: 
            <div className="check-row"><img src={appleCheck} alt="check box" className="tut-icon"/> valid</div>
            <div className="check-row"><img src={appleX} alt="x" className="tut-icon"/> invalid</div></div>
        </div>
    )
}

export default PageNine;
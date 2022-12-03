import React from "react";
import Arrow from "../Arrow";

//  Tutorial page 11: close error box (canvas)
function PageEleven (props) {
    return (
        <div className="pages">
            <div className='page-eight-arrow'>
                <Arrow/>
            </div>
            <div className="text-box" id="page-eight-box">click on the x again to close the error box</div>
        </div>
    )
}

export default PageEleven;
import React from "react";
import Arrow from "../Arrow";

// tutorial pg 5: zoom out icon (canvas)
function PageFive (props) {
    return (
        <div className="pages">
            <div className='page-five-arrow'>
                <Arrow/>
            </div>
            <div className="text-box" id="page-five-box">zoom out icon</div>
            <div className="text-box" id="key-box"> tip: you can hold down control and scroll to zoom in/out </div>
        </div>
    )
}

export default PageFive;
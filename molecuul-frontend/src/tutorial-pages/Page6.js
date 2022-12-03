import React from "react";
import Arrow from "../Arrow";

// tutorial pg 6: zoom in icon (canvas)
function PageSix (props) {
    return (
        <div className="pages">
            <div className='page-six-arrow'>
                <Arrow/>
            </div>
            <div className="text-box" id="page-six-box">zoom in icon</div>
            <div className="text-box" id="key-box"> tip: you can hold down control and scroll to zoom in/out </div>
        </div>
    )
}

export default PageSix;
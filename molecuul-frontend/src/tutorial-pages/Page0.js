import React from "react";
import Arrow from "../Arrow";

// tutorial pg 0: click to open menu    
function PageZero (props) {
    return (
        <div>
            <div className='page-zero-arrow'><Arrow/></div>
            <div className="text-box" id="page-zero-box">click here to open the tile menu</div>
        </div>
    )
}

export default PageZero;
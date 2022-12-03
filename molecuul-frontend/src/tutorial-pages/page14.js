import React from "react";
import Arrow from "../Arrow";

// tutorial pg 14 - drag and delete (canvas)
function PageFourteen (props) {
    return (
        <div className="pages">
            <div className='page-fourteen-arrow'>
                <Arrow/>
            </div>
            <div className="text-box" id="page-fourteen-box">drag an octagon over the trash can to delete it</div>  
        </div>
    )
}

export default PageFourteen;
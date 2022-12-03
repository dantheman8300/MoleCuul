import React from "react";
import Arrow from "../Arrow";

// tutorial pg 7: home icon (canvas)
function PageSeven (props) {
    return (
        <div className="pages">
            <div className='page-seven-arrow'>
                <Arrow/>
            </div>
            <div className="text-box" id="page-seven-box">home icon: puts molecule back into its original position on canvas</div>
            <div className="text-box" id='key-box'>hint if you can't find your molecule, try pressing the home button </div>
        </div>
    )
}

export default PageSeven;
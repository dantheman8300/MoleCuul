import React from "react";
import Arrow from "../Arrow";

// tutorial pg 15 - trash icon (canvas)
function PageFifteen (props) {
    return (
        <div className="pages">
            <div className='page-fourteen-arrow'>
                <Arrow/>
            </div>
            <div className="text-box" id="page-fourteen-box">trash icon - clears molecule from page</div>
            <div className="text-box" id='key-box'>can't add elements to the page? try hitting the trash icon and start over</div> 
        </div>
    )
}

export default PageFifteen;
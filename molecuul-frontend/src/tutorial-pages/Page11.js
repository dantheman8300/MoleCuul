import React from "react";
import Arrow from "../Arrow";

function PageEleven (props) {


    

    return (
        <div className="pages">
            <div className='page-two-arrow'>
                <Arrow/>
            </div>

            <div className="text-box">trash icon - clears molecule from page</div>
            <div className="text-box">hint (refresh won't clear the molecule, so if you can't find it try hitting this button)</div>
        
        </div>
)

}

export default PageEleven;
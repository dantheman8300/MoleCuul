import React from "react";
import Arrow from "../Arrow";
import BondKey from "./BondKey";

function PageThree (props) {


    

    return (
        <div className="pages">
            <div className='page-one-arrow'>
                <Arrow/>
            </div>

            <div className="text-box" id="page-one-box">click and drag a tile on to the canvas </div>
            <BondKey />
        
        </div>
)

}

export default PageThree;
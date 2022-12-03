import React from "react";
import bondKey from "../images/bond-key.svg";

// key to show single, double, triple bonds & lone pairs
function BondKey (props) {
    return (
        <div className="text-box" id="key-box"> key box 
            <img className="bond-key" src={bondKey} alt='key for types of bonds'/>
        </div>
    )
}

export default BondKey;
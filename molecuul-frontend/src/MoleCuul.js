import React from "react";
import ElementTile from "./ElementTile";
import DoubleBond from "./DoubleBond";
import ConfigurationMenu from "./ConfigurationMenu";

function MoleCuul() {
    const octInfo = {
        'color': '#DEF7FE',
        'size': 100,
        'atomicNum': 6,
        'symbol': 'C',
        'name': 'Carbon',
        'configs': [
            <DoubleBond />,
            <DoubleBond />,
            <DoubleBond />,
            <DoubleBond />,
        ]
    };



    return (
        <div className="container">
            <ConfigurationMenu />
            <ElementTile info= {octInfo}/>

        </div>
        
        
    )
}

export default MoleCuul;
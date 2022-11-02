import React from "react";
import ElementTile from "./ElementTile";
import DoubleBond from "./DoubleBond";
import SingleBond from "./SingleBond";
import ConfigurationMenu from "./ConfigurationMenu";
import oct from "./molecuul-oct.svg"

function MoleCuul() {
    const octInfo = {
        'color': '#DEF7FE',
        'size': 101,
        'atomicNum': 6,
        'symbol': 'C',
        'name': 'Carbon',
        'configs': [
            <SingleBond />,
            <DoubleBond />,
            <DoubleBond />,
            <DoubleBond />,
        ]
    };



    return (
        <div className="container">
            <ConfigurationMenu />
            <div  className="octagonTile">
                <ElementTile info= {octInfo}/>
            </div>
            
            <ElementTile info= {octInfo}/>
            <ElementTile info= {octInfo}/>

            <img className="oct-img" src={oct} alt="octagon"></img>

        </div>
        
        
    )
}

export default MoleCuul;
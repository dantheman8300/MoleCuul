import React from "react";
// import DoubleBond from "./DoubleBond";
// import SingleBond from "./SingleBond";
import ConfigurationMenu from "./ConfigurationMenu";
import oct1 from "./images/carbon22.svg";
import oct2 from "./images/carbon31.svg";
import oct3 from "./images/carbon211.svg";
import oct4 from "./images/carbon1111.svg";
import oct5 from "./images/oxygen244.svg";
import oct6 from "./images/oxygen1144.svg";
import oct7 from "./images/oxygen4114.svg";
import oct8 from "./images/oxygen4411.svg";


function MoleCuul() {
    // const octInfo = {
    //     'color': '#DEF7FE',
    //     'size': 101,
    //     'atomicNum': 6,
    //     'symbol': 'C',
    //     'name': 'Carbon',
    //     'configs': [
    //         <SingleBond />,
    //         <DoubleBond />,
    //         <DoubleBond />,
    //         <DoubleBond />,
    //     ]
    // };



    return (
        <div className="container">
            <ConfigurationMenu />
            <div  className="octagonTile">
            </div>
            

            <img className="oct-img" src={oct1} alt="octagon"></img>
            <img className="oct-img" src={oct2} alt="octagon"></img>
            <img className="oct-img" src={oct3} alt="octagon"></img>
            <img className="oct-img" src={oct4} alt="octagon"></img>
            <img className="oct-img" src={oct5} alt="octagon"></img>
            <img className="oct-img" src={oct6} alt="octagon"></img>
            <img className="oct-img" src={oct7} alt="octagon"></img>
            <img className="oct-img" src={oct8} alt="octagon"></img>


        </div>
        
        
    )
}

export default MoleCuul;
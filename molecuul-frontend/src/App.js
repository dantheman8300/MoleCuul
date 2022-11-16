import React from "react";
import InstructionTile from "./InstructionTile";
import Sidebar from "./Sidebar";

function MoleCuul() {

    // const lst = [
    //     "CH4",
    //     "C2H6",
    //     "CO2",
    //     "H2O",
    //     "CH2O",
    //     "C2H2",
    //     "C2H4O",
    //     "CH3OH"
    // ]
    return (
        <div className="container">
            <Sidebar />
            <InstructionTile />
        </div>
    )
}

export default MoleCuul;
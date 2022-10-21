import React from "react";
import ElementTile from "./ElementTile";
import ElementTool from "./ElementTool";
import ConfigurationMenu from "./ConfigurationMenu";

function MoleCuul() {
    return (
        <div className="container">
            <ElementTile />
            <ElementTool />
            <ConfigurationMenu />
        </div>
    );
}

export default MoleCuul;
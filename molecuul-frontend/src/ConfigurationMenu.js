import React from "react";
import ConfigMenuTile from "./ConfigMenuTile";
import ConfigMenuTiles from "./ConfigMenuTiles";

function ConfigurationMenu(props) {
    const images = props.info.configs;
    const symbol = props.info.symbol;
    const singleConfig = (() => {
        if(images.length === 1) return true;
        else return false;
    })();
    return (
        <div>
            {singleConfig && <div className="configurationMenu-single"><ConfigMenuTile config={images} symbol={symbol} handleDragStart={props.handleDragStart}/> </ div>}
            {!singleConfig && <div className="configurationMenu"><ConfigMenuTiles configs={images} symbol={symbol} handleDragStart={props.handleDragStart}/> </ div>}
        </div>
    )
}

export default ConfigurationMenu;
import React from "react";
import ConfigMenuTiles from "./ConfigMenuTiles";

function ConfigurationMenu(props) {
    const images = props.info.images;
    const symbol = props.info.symbol;
    return (
        <div className="configurationMenu">
            <ConfigMenuTiles configs={images} symbol={symbol} handleDragStart={props.handleDragStart}/>
        </div>
    )
}

export default ConfigurationMenu;
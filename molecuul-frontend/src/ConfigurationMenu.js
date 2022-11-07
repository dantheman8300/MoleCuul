import React from "react";
import ConfigMenuTiles from "./ConfigMenuTiles";

function ConfigurationMenu(props) {
    const images = props.info.configs;
    const symbol = props.info.symbol;
    return (
        <div className="configurationMenu">
            <ConfigMenuTiles configs={images} symbol={symbol}/>
        </div>
    )
}

export default ConfigurationMenu;
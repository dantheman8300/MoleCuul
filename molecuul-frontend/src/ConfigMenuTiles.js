import React from "react";
import ElementTile from "./ElementTile";

function ConfigMenuTiles(props) {
    const symbol = props.symbol;
    const tiles = props.configs.map((image, index) =>{
        return (
            <ElementTile key={index} image={image} symbol={symbol} handleDragStart={props.handleDragStart}/>
        )
    })
    return (
        <div className="configurations">
            {tiles}
        </div>
    )
}

export default ConfigMenuTiles;
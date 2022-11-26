import React from "react";
import ElementTile from "./ElementTile";

function ConfigMenuTile(props) {
    const symbol = props.symbol;
    const tile = props.config.map((image, index) =>{
        return (
            <ElementTile key={index} image={image} symbol={symbol} />
        )
    })

    return (
        <div className="configuration-single">
            {console.log(symbol)}
            {tile}
        </div>
    )
}

export default ConfigMenuTile;
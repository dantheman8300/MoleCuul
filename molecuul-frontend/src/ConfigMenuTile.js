import React from "react";
import ElementTile from "./ElementTile";

function ConfigMenuTile(props) {

    console.log("config menu tile");
    console.log(props.config);
    const symbol = props.symbol;
    const tile = props.config.map((image, index) =>{
        return (
            <ElementTile key={index} image={image} symbol={symbol} handleDragStart={props.handleDragStart} handleDragEnd={props.handleDragEnd}
            openTutorial={props.openTutorial} curInd={props.curInd} increaseCurInd={props.increaseCurInd} setFocusMsg={props.setFocusMsg}/>
        )
    })

    return (
        <div className="configuration-single">
            {tile}
        </div>
    )
}

export default ConfigMenuTile;
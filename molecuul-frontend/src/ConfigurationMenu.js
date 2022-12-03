import React from "react";
import ConfigMenuTile from "./ConfigMenuTile";
import ConfigMenuTiles from "./ConfigMenuTiles";

function ConfigurationMenu(props) {

    
    const images = props.info.cfgs;
    const symbol = props.info.symbol;

    const singleConfig = (() => {
        if(images.length === 1) return true;
        else return false;
    })();

    const checkTutorial = event => {
        props.setFocusMsg(false)
        if(props.openTutorial && props.curInd === 1) {
            props.increaseCurInd()
        }
    }
    
    return (
        <div>
            {singleConfig && <div className="configurationMenu-single" ><ConfigMenuTile config={images} symbol={symbol} handleDragStart={props.handleDragStart} handleDragEnd={props.handleDragEnd} 
            openTutorial={props.openTutorial} curInd={props.curInd} increaseCurInd={props.increaseCurInd} setFocusMsg={props.setFocusMsg}/> </ div>}
            {!singleConfig && <div className="configurationMenu" onScroll={checkTutorial} ><ConfigMenuTiles configs={images} symbol={symbol} handleDragStart={props.handleDragStart} handleDragEnd={props.handleDragEnd}
            openTutorial={props.openTutorial} curInd={props.curInd} increaseCurInd={props.increaseCurInd} setFocusMsg={props.setFocusMsg}/> </ div>}
        </div>
    )
}

export default ConfigurationMenu;
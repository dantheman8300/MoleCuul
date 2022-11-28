import React, {useEffect} from "react";
import ConfigMenuTile from "./ConfigMenuTile";
import ConfigMenuTiles from "./ConfigMenuTiles";
import axios from 'axios';

function ConfigurationMenu(props) {

    console.log("props.info.cfgs");
        console.log(props.info.cfgs);
    
    const images = props.info.cfgs;
    const symbol = props.info.symbol;

    const singleConfig = (() => {
        if(images.length === 1) {
            return true;

        } else  {
            return false;
        }
    })();
    
    return (
        <div >
        {singleConfig && <div className="configurationMenu-single"><ConfigMenuTile config={images} symbol={symbol} /> </ div>}
        {!singleConfig && <div className="configurationMenu"><ConfigMenuTiles configs={images} symbol={symbol}/> </ div>}
        </div>
    )
}

export default ConfigurationMenu;
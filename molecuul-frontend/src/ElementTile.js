import React from 'react';
import OctagonSymbol from "./OctagonSymbol";
import OctagonLabel from "./OctagonLabel";
import OctagonNum from "./OctagonNumber";
import Octagon from "./Octagon";

function ElementTile(props) {
    const info = props.info;
    const configs = props.info.configs;
    return (
        <div className='OctagonTile'>  
            
            
            <div className='OctagonInfo'>
                <Octagon octFill={info.color} octSize={info.size} />
                <div className='OctagonInfo' id="configTop">{configs[0]}</div>
                <OctagonNum className='OctagonInfo' octNum={info.atomicNum} />
                
                <div className='OctagonInfo' id="elemRL">
                    <div id="configLeft">{configs[1]}</div>
                    <OctagonSymbol octSym={info.symbol} />
                    <div id="configRight">{configs[2]}</div>
                </div>
                <OctagonLabel className='OctagonInfo' octLabel={info.name} />
                <div className='OctagonInfo' id="configBottom">{configs[3]}</div>
            </div>
         </div>  
    )
};

export default ElementTile;
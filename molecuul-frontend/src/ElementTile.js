import React from 'react';
import OctagonSymbol from "./OctagonSymbol";
import OctagonLabel from "./OctagonLabel";
import OctagonNum from "./OctagonNumber";
import Octagon from "./Octagon";

function ElementTile(props) {
    const info = props.info;
    const configs = props.info.configs;
    return (
        <div className='Element'>
            <Octagon octFill={info.color} octSize={info.size} />
            <div className='OctagonInfo'>
                <div id="configTop">{configs[0]}</div>
                <OctagonNum octNum={info.atomicNum} />
                
                <div id="elemRL">
                    <div id="configLeft">{configs[1]}</div>
                    <OctagonSymbol octSym={info.symbol} />
                    <div id="configRight">{configs[2]}</div>
                </div>
                <OctagonLabel octLabel={info.name} />
                <div id="configBottom">{configs[3]}</div>
            </div>
        </div>
    )
};

export default ElementTile;
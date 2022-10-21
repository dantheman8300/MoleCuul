import React from 'react';
import { PolyLine } from 'draw-shape-reactjs';
function Octagon(props) {
    const x = props.xCoord;
    const y = props.yCoord;
    const len = props.lengthOctagon;
    const hyp = (len / Math.sqrt(2));
    console.log(hyp);
    return (
        < PolyLine className="octagon"
        position='fixed'
        points={[[x, y], [(x+len), y], 
                [x+hyp+len, y+hyp], [x+hyp+len, y+hyp+len], 
                [x+len, y+hyp+hyp+len], [x, y+hyp+hyp+len], 
                [x-hyp, y+hyp+len], [x-hyp, y+hyp], [x,y]]}
        color='#ff8f00'
        />
    );
}

export default Octagon;
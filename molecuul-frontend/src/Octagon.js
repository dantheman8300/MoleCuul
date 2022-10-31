import React from 'react';
import Polygon from 'react-polygon';

function Octagon(props) {
    return ( 
            <Polygon className='octagon OctagonInfo' n={8} fill={props.octFill} size={props.octSize}/> 
    )
};

export default Octagon;
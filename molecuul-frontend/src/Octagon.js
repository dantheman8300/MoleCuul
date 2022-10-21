import React from 'react';

/* npm install react-polygon*/
import Polygon from 'react-polygon'



function Octagon(props){
    return (
        <Polygon className='octa' n={8} fill={props.polyColor} size={props.polySize}/> 
    )}

export default Octagon;
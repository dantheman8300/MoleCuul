import React from 'react';

/* Element tile background rendered on config menu */
function Octagon(props) {
    const image = props.image;
    const alt = props.alt;
    return ( 
            <img className="oct-img" src={require(`./images/${image}.svg`)} alt={alt}/> 
    )
};

export default Octagon;
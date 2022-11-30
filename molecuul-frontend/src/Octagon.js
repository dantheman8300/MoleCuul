import React from 'react';

/* Element tile background rendered on config menu */
const Octagon = React.memo(function Octagon(props) {
    const image = props.image.imagefile;
    const alt = props.alt;
    const rotation = props.rotation;

    const style = {
        position: "relative",
        width: "75px",
        height: "75px",
        margin: "5px",
        alignSelf: "center",
        transform: `rotate(${(45 * rotation).toString()}deg)`
    }
    return ( 
        <div>
            <img style={style} src={require(`./images/${image}.svg`)} alt={alt}/> 
        </div>
    )
});

export default Octagon;
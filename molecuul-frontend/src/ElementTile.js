import React, {useState} from 'react';
import Octagon from "./Octagon";
import OctagonSymbol from "./OctagonSymbol.js";
import shadow from "./images/oct-shadow.svg";

/* Element tile rendered on configuration menu */
function ElementTile(props) {
    const [isClicked, Active] = useState(false);
    const image = props.image;
    const symbol = props.symbol;


    const handleClick = event => {
        Active(current => !current);
    }

    return (
        <div className='tile-and-symbol' onClick={handleClick}>
            <Octagon image={image} alt={"image of" + image} />
            <OctagonSymbol symbol={symbol}/>
            {isClicked && <img className="oct-shadow" src={shadow} alt='octagon shadow' />}
        </div>
    )
};

export default ElementTile;
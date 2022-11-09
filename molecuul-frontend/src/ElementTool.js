import React, {useState} from 'react';
import ConfigurationMenu from "./ConfigurationMenu";
import square from "./images/square-carbon.svg"

/* square element on sidebar */
function ElementTool () {
    const [isOpen, Open] = useState(false);
    const octInfo = {
        'atomicNum': 6,
        'symbol': 'C',
        'name': 'Carbon',
        'configs': [
            "carbon22",
            "carbon31"
        ]
    };
    const handleClick = event => {
        Open(current => !current);
    }
    return (
        <div className='ElementTool'>
            <img id='elem-square' src={square} alt='element tile' onClick={handleClick} />
            {isOpen && <ConfigurationMenu info={octInfo}/>}
        </div>
    )
}

export default ElementTool;


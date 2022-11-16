import React, {useEffect, useState} from 'react';
import ConfigurationMenu from "./ConfigurationMenu";

/* square element on sidebar */
function ElementTools (props) {
    const info = props.info;

    const [isOpen, Open] = useState(false);

    const index = props.index;

    const handleClick = event => {
        Open(current => !current);
    }

    const tools = elemInfo.map((item, index) => {
        return (
            <ElementTool info={item} key={index} index={index}/>
            
            // <ElementTool info={elemInfo} key={index} index={index}/>
        )
    });
    
    return (
        <div>
            <img id='elem-square' src={require(`./images/${image}.svg`)} alt='element tile' onClick={handleClick} />
            {isOpen && <ConfigurationMenu info={octInfo}/>}
        </div>
    )
}

export default ElementTools;


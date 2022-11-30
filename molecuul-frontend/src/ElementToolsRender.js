import React, {useEffect, useState} from 'react';
import ConfigurationMenu from "./ConfigurationMenu";

/* square element on sidebar */
function ElementTools (props) {
    const info = props.info;

    const [isOpen, setOpen] = useState([... false]);
    const ind = -1;


    handleChange((index) => {
        ind = index;
    });

    const tools = elemInfo.map((item, index) => {
        return (
            <ElementTool info={item} key={index} index={index} />
        )
    });
    
    return (
        <div>
            {tools}
            {/* <img id='elem-square' src={require(`./images/${image}.svg`)} alt='element tile' onClick={handleClick} /> */}
            {isOpen && <ConfigurationMenu info={octInfo}/>}
        </div>
    )
}

export default ElementTools;


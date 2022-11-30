import React from 'react';

const colorMap = {
    "C": "#317389",
    "H": "#5A56A5 ",
    "O": "#4166B0",
    "N": "#113352",
    "Cl": "#B84026" 
}

/* Element tile */
function ElementImage(props) {
    return (
        <div className='element-render'> 
            <img src={require(`./images/${props.image}.svg`)} alt={'render of' + props.image} style={{height:props.scale * 50, width:props.scale * 50, transform: `rotate(${props.rotation * 45}deg)`}}/>
            <div id='elemSym' style={{height:1, width:1, fontSize:props.scale * 20, color: colorMap[props.symbol]}}>{props.symbol}</div>
        </div>
    )
};

export default ElementImage;
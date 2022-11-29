import React from 'react';

/* Element tile */
function ElementImage(props) {
    return (
        <div className='element-render'> 
            <img src={require(`./images/${props.image}.svg`)} alt={'render of' + props.image} style={{height:props.scale * 50, width:props.scale * 50}}/>
            <div id='elemSym' style={{height:1, width:1, fontSize:props.scale * 20}}>{props.symbol}</div>
        </div>
    )
};

export default ElementImage;
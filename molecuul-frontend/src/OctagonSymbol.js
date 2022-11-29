import React from 'react';

/* Symbol of Element rendered onto element tile */
function OctagonSymbol(props) {
    const sym = props.symbol;
    const colorMap = {
        "C": "#317389",
        "H": "#5A56A5 ",
        "O": "#4166B0",
        "N": "#113352",
        "Cl": "#B84026" 
    }

    return (
        <div  id="octSym" style={{color: colorMap[sym]}}>{sym}</div>
    )
};

export default OctagonSymbol;
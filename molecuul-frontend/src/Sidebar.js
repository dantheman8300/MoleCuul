import React from "react";
import ElementTool from "./ElementTool";

function Sidebar (props) {
    const elemInfo = [{
        'atomicNum': 6,
        'symbol': 'C',
        'name': 'Carbon',
        'configs': [
            "carbon22",
            "carbon31",
            "carbon1111"
        ],   
        
        'tile': "square-carbon",
    },
    {
        'atomicNum': 12,
        'symbol': 'O',
        'name': 'Oxygen',
        'configs': [
            "oxygen244",
            "oxygen1144"
        ],
        'tile': "square-oxygen",
    },
    {
        'atomicNum': 1,
        'symbol': 'H',
        'name': 'Hydrogen',
        'configs': [
            "hydrogen1"
        ],
        'tile': "square-hydrogen",
    }];

  

    const tools = elemInfo.map((item, index) => {
        return (
            <ElementTool info={item} key={index} index={index}/>
            
            // <ElementTool info={elemInfo} key={index} index={index}/>
        )
    });


    return (
        <div className="sidebar">
            {tools}
        </div>
    )


}

export default Sidebar;

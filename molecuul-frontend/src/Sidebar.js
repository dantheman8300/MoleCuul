import React, {useEffect, useState}  from "react";
import ElementTool from "./ElementTool";
import "./Sidebar.css";

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
        'atomicNum': 8,
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

    let state = new Array(elemInfo.length).fill(false);

    const [isOpen, setOpen] = useState(state)


    const handleChange = (ind) => {
        
        console.log(isOpen)
        // setOpen[ind](current => !current)

        setOpen(
            isOpen.map((item, index) => {
                console.log(ind + "   " + index)
                if (ind === index) {
                    console.log(ind + "   " + !item)
                    return !item;
                }
                else { 
                    return false;
                }
            })
        )
        console.log(isOpen)
    }

    

    // const [isOpen, setOpen] = useState([])

    // const handleChange = ((index) => {
        // console.log(index);
        // setOpen(isOpen.map((item, ind) => {
        //     if(ind !== index) {
        //         isOpen[ind] = false;
        //     }
        //     else {
        //         isOpen[ind] = true;
        //     }
        // }))
        // console.log(isOpen)
    // });

    // const handleClick = 

    const tools = elemInfo.map((item, index) => {
        return (
            <div>
                {/* {console.log(item)} */}
                <ElementTool info={item} key={index} index={index} handleDragStart={props.handleDragStart} handleChange={handleChange} isOpen={isOpen[index]} />
            </div>
            
            
        )
    });

   

    return (
        <div className="sidebar">
            {tools}
        </div>
    )
}

export default Sidebar;

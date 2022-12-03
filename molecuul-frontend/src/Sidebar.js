import React, {useEffect, useState}  from "react";
import ElementTool from "./ElementTool";
import "./Sidebar.css";
import axios from "axios";

function Sidebar (props) {
    const [elements, setElements] = useState([]);
    const [isOpen, setOpen] = useState([])

    useEffect(() => {
        fetchAll().then( result => {
           if (result) 
            setElements(result);
            setOpen(new Array(result.length).fill(false))
         });
     }, [] );

     async function fetchAll(){
        try {
           const response = await axios.get("http://localhost:5001/elements");
           return response.data.elements;     
        }
        catch (error){
           //We're not handling errors. Just logging into the console.
           console.log("error"); 
           return false;         
        }
     }

    const handleChange = (ind) => {
        setOpen(
            isOpen.map((item, index) => {
                if (ind === index) {
                    if(props.openTutorial && props.curInd === 0 && !item === true) {
                        props.increaseCurInd()
                    }
                    props.setFocusMsg(false)
                    return !item;
                }
                else { 
                    props.setFocusMsg(false)
                    return false;
                }
            })
        )
        // console.log("isOpen   " + isOpen)
    }


    const tools = elements.map((item, index) => {
        return (
            <div key={`Element tool: ` + index}>
                <ElementTool key={index} info={item} index={index} handleDragStart={props.handleDragStart} handleDragEnd={props.handleDragEnd} handleChange={handleChange} isOpen={isOpen[index]} 
                    openTutorial={props.openTutorial} curInd={props.curInd} increaseCurInd={props.increaseCurInd} 
                    setFocusMsg={props.setFocusMsg} />
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

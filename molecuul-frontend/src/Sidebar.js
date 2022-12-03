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
        //    console.log("response");
        //    console.log(response.data.elements);
           return response.data.elements;     
        }
        catch (error){
           //We're not handling errors. Just logging into the console.
           console.log("error"); 
           return false;         
        }
     }

    

    // seeElementConfigs();
    //  console.log(elements.length)   
    // let state = ;
    // console.log(state)
    

    //  console.log("after usestate   " ,  isOpen)
    const handleChange = (ind) => {
        // setOpen[ind](current => !current)
        setOpen(
            isOpen.map((item, index) => {
                // console.log(ind + "   " + index)
                if (ind === index) {
                    // console.log(ind + " hi  " + !item)
                    if(props.openTutorial && props.curInd === 0 && !item === true) {
                        props.increaseCurInd()
                    }
                    props.setFocusMsg(false)
                    return !item;
                    
                }
                else { 
                    // props.handleRotation(0);
                    
                    props.setFocusMsg(false)
                    return false;
                    
                }
            })
        )
        
        console.log("isOpen   " + isOpen)
    }


    const tools = elements.map((item, index) => {
        return (
            <div key={`Element tool: ` + index}>
                {/* {console.log(item)} */}
                <ElementTool key={index} info={item} index={index} handleDragStart={props.handleDragStart} handleDragEnd={props.handleDragEnd} handleChange={handleChange} isOpen={isOpen[index]} 
                    openTutorial={props.openTutorial} curInd={props.curInd} increaseCurInd={props.increaseCurInd} 
                    setFocusMsg={props.setFocusMsg} />
            </div>
        )
    });

   

    // function seeElementConfigs() {
    //     for (let i = 0; i < elements.length; i++) {
    //         for (const property in elements[i].configs[0]) {
    //             // console.log(property);
    //         }
    //         // for (let j = 0; j < elements[i].cfgs.length; j++) {
    //         //     console.log(elements[i].cfgs[j].imagefile);
    //         // }
    //     }
    // }


    


    return (
        <div className="sidebar">
            {tools}
        </div>
    )
}

export default Sidebar;

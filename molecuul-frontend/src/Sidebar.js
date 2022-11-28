import React, {useEffect, useState}  from "react";
import ElementTool from "./ElementTool";
import "./Sidebar.css";
import axios from "axios";

function Sidebar (props) {


    const [elements, setElements] = useState([]);

    useEffect(() => {
        fetchAll().then( result => {
           if (result) 
            setElements(result);    
         });
     }, [] );

     async function fetchAll(){
        try {
           const response = await axios.get("http://localhost:5000/elements");
           console.log("response");
           console.log(response.data.elements);
           return response.data.elements;     
        }
        catch (error){
           //We're not handling errors. Just logging into the console.
           console.log("error"); 
           return false;         
        }
     }

    

    seeElementConfigs();


    const tools = elements.map((item, index) => {
        return (
            <div>
                {/* {console.log(item)} */}
                <ElementTool info={item} key={index} index={index} handleDragStart={props.handleDragStart} handleDragEnd={props.handleDragEnd} handleChange={handleChange} isOpen={isOpen[index]} />
            </div>
            
            
        )
    });

   

    function seeElementConfigs() {
        for (let i = 0; i < elements.length; i++) {
            for (const property in elements[i].configs[0]) {
                console.log(property);
            }
            // for (let j = 0; j < elements[i].cfgs.length; j++) {
            //     console.log(elements[i].cfgs[j].imagefile);
            // }
        }
    }


    let state = new Array(elements  .length).fill(false);
    
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


    return (
        <div className="sidebar">
            {console.log(tools)}
            {tools}
        </div>
    )
}

export default Sidebar;

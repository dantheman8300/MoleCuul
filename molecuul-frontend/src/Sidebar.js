import React, {useState, useEffect} from "react";
import ElementTool from "./ElementTool";
import axios from 'axios';

function Sidebar () {

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
            <ElementTool info={item} key={index} index={index}/>
            
        )
    });


    function seeElementConfigs() {
        for (let i = 0; i < elements.length; i++) {
            console.log(elements[i]);
        }
    }

    return (
        <div className="sidebar">
            {tools}
        </div>
    )


}



export default Sidebar;

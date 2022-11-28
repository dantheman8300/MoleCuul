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

    return (
        <div className="sidebar">
            {tools}
        </div>
    )
}

export default Sidebar;

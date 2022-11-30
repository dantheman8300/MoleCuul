import InstructionTile from "./InstructionTile";
import React, {useState} from "react";
import Sidebar from "./Sidebar";
import FreeBuildPage from "./FreeBuildPage.js";
import Canvas from "./Canvas";
import Header from "./Header";
import ValidateMolecule from "./ValidateMolecule";

function App() {

    // Create state to hold the currently selected element from sidebar
    const [selectedElement, setSelectedElement] = useState(null);
    const [hover, setHover] = useState(false);
    // const [rotation, setRotation] = React.useState(0);


    const handleElementDragStart = (elementInfo) => {
        console.log(`Drag started for ${elementInfo}`);
        setSelectedElement(elementInfo);
        setHover(!hover);
    }

    const handleElementDragEnd = () => {
        setHover(!hover);
        setSelectedElement(null);
    }

    // const handleElementRotation = (rotator) => {
    //     console.log(`Rotation changed to ${rotation}`);
    //     if (rotation === 0) {
    //         setRotation(0);
    //     } else {
    //         setRotation(rotation + rotator);
    //     }
    // }


    // const lst = [
    //     "CH4",
    //     "C2H6",
    //     "CO2",
    //     "H2O",
    //     "CH2O",
    //     "C2H2",
    //     "C2H4O",
    //     "CH3OH"
    // ]
    return (
        <div className="container">
            <FreeBuildPage 
            sidebar = {
                <Sidebar 
                    handleDragStart={handleElementDragStart}
                    handleDragEnd={handleElementDragEnd}
                    // handleRotation={handleElementRotation}
                />
            }
            canvas = {<Canvas selectedElement={selectedElement} hover={hover} 
            handleDragStart={handleElementDragStart} handleDragEnd={handleElementDragEnd}/>}
            header = {<Header />}
            />
            

        </div>
    )
}

export default App;
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

    const handleElementDragStart = (id) => {
        console.log(`Drag started for ${id}`);
        setSelectedElement(id);
        setHover(!hover);
    }

    const handleElementDragEnd = () => {
        setHover(!hover);
        setSelectedElement(null);
    }

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
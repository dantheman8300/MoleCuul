import React, {useState} from "react";
import Sidebar from "./Sidebar";
import FreeBuildPage from "./FreeBuildPage.js";
import Canvas from "./Canvas";
import Header from "./Header";

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

    return (
        <div className="container">
            <FreeBuildPage 
            header = {<Header/>}
            sidebar = {
                <Sidebar 
                    handleDragStart={handleElementDragStart}
                    handleDragEnd={handleElementDragEnd}
                />
            }
            canvas = {<Canvas selectedElement={selectedElement} hover={hover}/>}
            />
        </div>
    )
}

export default App;
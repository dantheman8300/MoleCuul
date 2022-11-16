import React, {useState} from "react";
import Sidebar from "./Sidebar";
import FreeBuildPage from "./FreeBuildPage.js";
import Canvas from "./Canvas";
import Header from "./Header";

function App() {

    // Create state to hold the currently selected element from sidebar
    const [selectedElement, setSelectedElement] = useState(null);

    const handleElementDragStart = (id) => {
        console.log(`Drag started for ${id}`);
        setSelectedElement(id);
    }

    return (
        <div className="container">
            <FreeBuildPage 
            header = {<Header/>}
            sidebar = {
                <Sidebar 
                    handleDragStart={handleElementDragStart}
                />
            }
            canvas = {<Canvas selectedElement={selectedElement}/>}
            />
        </div>
    )
}

export default App;
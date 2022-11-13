import React from "react";
import ElementTool from "./ElementTool";
import "./Sidebar.css";

function Sidebar (props) {
    


    return (
        <div className="sidebar">
            <ElementTool handleDragStart={props.handleDragStart}/>
            <ElementTool handleDragStart={props.handleDragStart}/>
            <ElementTool handleDragStart={props.handleDragStart}/>
        </div>
    )


}

export default Sidebar;

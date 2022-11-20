import React from "react";
import ElementTool from "./ElementTool";
import "./Sidebar.css";

function Sidebar (props) {
    


    return (
        <div className="sidebar">
            <ElementTool handleDragStart={props.handleDragStart} handleDragEnd={props.handleDragEnd}/>
            <ElementTool handleDragStart={props.handleDragStart} handleDragEnd={props.handleDragEnd}/>
            <ElementTool handleDragStart={props.handleDragStart} handleDragEnd={props.handleDragEnd}/>
        </div>
    )


}

export default Sidebar;

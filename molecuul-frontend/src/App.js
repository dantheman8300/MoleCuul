import React from "react";
import Sidebar from "./Sidebar";
import FreeBuildPage from "./FreeBuildPage.js";
import Canvas from "./Canvas";

function MoleCuul() {

    return (
        <div className="container">
            <FreeBuildPage 
            header = {<h1>Header here</h1>}
            sidebar = {<Sidebar/>}
            canvas = {<Canvas/>}
            />
        </div>
    )
}

export default MoleCuul;
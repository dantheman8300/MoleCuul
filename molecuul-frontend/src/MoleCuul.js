import React from "react";
import FreeBuildPage from "./FreeBuildPage.js";
import Canvas from "./Canvas";

function MoleCuul() {
    return (
        <div >
            <FreeBuildPage 
            header = {<h1>Header here</h1>}
            sidebar = {<h1>Sidebar here</h1>}
            canvas = {<Canvas/>}
            />

        </div>
    );
}

export default MoleCuul;
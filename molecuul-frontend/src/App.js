import React from "react";
import Sidebar from "./Sidebar";
import FreeBuildPage from "./FreeBuildPage.js";
import Canvas from "./Canvas";
import Header from "./Header";

function MoleCuul() {

    return (
        <div className="container">
            <FreeBuildPage 
            header = {<Header/>}
            sidebar = {<Sidebar/>}
            canvas = {<Canvas/>}
            />
        </div>
    )
}

export default MoleCuul;
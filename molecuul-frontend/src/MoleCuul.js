import React from "react";
import ElementTile from "./ElementTile";
import ElementTool from "./ElementTool";
import ConfigurationMenu from "./ConfigurationMenu";
import Header from "./Header";
import HamburgerMenu from "./HamburgerMenu";
import Sidebar from "./Sidebar";

function MoleCuul() {
    return (
        <div className="container">
            <Header />
            <HamburgerMenu />
        </div>
    );
}

export default MoleCuul;
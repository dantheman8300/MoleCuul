import React from "react";
import ElementTile from "./ElementTile";
import ElementTool from "./ElementTool";
import ConfigurationMenu from "./ConfigurationMenu";
import Header from "./Header";
import HamburgerMenu from "./HamburgerMenu";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Switch, 
    Route, Redirect,} from "react-router-dom";

function MoleCuul() {
    return (
        <div className="container">
            <Header />
            <HamburgerMenu />
            <Sidebar />
        </div>
    );
}


export default MoleCuul;
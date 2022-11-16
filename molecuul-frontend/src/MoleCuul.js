import React from "react";
import FreeBuildPage from "./FreeBuildPage.js";
import Canvas from "./Canvas";
import elementCarbon from './icons/Element-Carbon.png';
import ElementTile from "./ElementTile";
import ElementTool from "./ElementTool";
import ConfigurationMenu from "./ConfigurationMenu";
import Header from "./Header";
import HamburgerMenu from "./HamburgerMenu";
import Sidebar from "./Sidebar";

function MoleCuul() {
    const element = {
        elementName: null, 
        lStructure: null 
    };
    
    var newElement = false;

    const setElement = (elementName, lStructure) => {
        element.elementName = elementName;
        element.lStructure =lStructure;
        newElement = true;    
    }

    return (
        <div >
            <FreeBuildPage 
            header = {<h1>Header here</h1>}
            sidebar = {<h1>Sidebar here<button><img src={elementCarbon} width={50} height={50} alt="Carbon" onClick={setElement("Carbon", [1,0,1,0,1,0,1,0])}/></button></h1>}
            canvas = {<Canvas elementType={element} newElement={newElement} />}
            />
        </div>
    );
}

export default MoleCuul;